import { getCliClient } from "sanity/cli";
import { basename } from "node:path";
import { createHash } from "node:crypto";
import { Readable } from "node:stream";

const client = getCliClient({ apiVersion: "2026-10-01" });
const mode = process.argv.includes("--audit") ? "audit" : process.argv.includes("--finalize") ? "finalize" : "stdin";

function keyed(items, prefix) {
  return (items || []).filter(Boolean).map((item, index) => ({ _key: `${prefix}-${index}`, ...item }));
}

async function readInput() {
  let input = "";
  for await (const chunk of process.stdin) input += chunk;
  return JSON.parse(input);
}

async function importMetadata(products) {
  for (let start = 0; start < products.length; start += 10) {
    const batch = products.slice(start, start + 10);
    await Promise.all(batch.map(async (product) => {
      const id = `product-${product.slug}`;
      const existing = await client.getDocument(id);
      if (!existing) throw new Error(`Missing Sanity product: ${product.slug}`);
      await client.patch(id).set({
        title: product.title,
        description: product.description,
        features: product.features || [],
        idealFor: product.idealFor || [],
        specifications: keyed(product.specifications, "spec"),
        sourceUrl: product.url,
        sourceImages: keyed(product.gallery, "source-image"),
      }).commit();
    }));
    console.log(`Metadata ${Math.min(start + batch.length, products.length)}/${products.length}`);
  }
}

async function importAssets(items) {
  for (let start = 0; start < items.length; start += 5) {
    const batch = items.slice(start, start + 5);
    await Promise.all(batch.map(async (item) => {
      const existing = await client.fetch(
        '*[_type == "sanity.imageAsset" && source.id == $url][0]{_id}',
        { url: item.url },
      );
      if (existing?._id) return;
      const bytes = Buffer.from(item.base64, "base64");
      const asset = await client.assets.upload("image", Readable.from(bytes), {
        filename: decodeURIComponent(basename(new URL(item.url).pathname)),
        contentType: item.contentType || "image/jpeg",
        source: { id: item.url, name: "YourCustomBottle", url: item.url },
      });
      await client.createOrReplace({
        _id: `migration-image-alias-${createHash("sha1").update(item.url).digest("hex")}`,
        _type: "migrationImageAlias",
        url: item.url,
        asset: { _type: "reference", _ref: asset._id },
      });
    }));
    console.log(`Assets ${Math.min(start + batch.length, items.length)}/${items.length}`);
  }
}

async function importTags(tags) {
  const products = await client.fetch('*[_type == "product"]{_id, "slug": slug.current}');
  const tagMap = new Map(products.map((product) => [product.slug, []]));
  for (const tag of tags) {
    for (const slug of tag.products || []) {
      if (tagMap.has(slug)) tagMap.get(slug).push(tag.slug);
    }
  }
  for (let start = 0; start < products.length; start += 20) {
    const batch = products.slice(start, start + 20);
    await Promise.all(batch.map((product) => client.patch(product._id).set({
      tags: tagMap.get(product.slug) || [],
    }).commit()));
    console.log(`Tags ${Math.min(start + batch.length, products.length)}/${products.length}`);
  }
}

async function finalizeProducts() {
  const [products, assets, aliases] = await Promise.all([
    client.fetch('*[_type == "product" && defined(sourceImages)]{_id, sourceImages}'),
    client.fetch('*[_type == "sanity.imageAsset"]{_id, originalFilename, "url": source.id}'),
    client.fetch('*[_type == "migrationImageAlias"]{url, "assetId": asset._ref}'),
  ]);
  const assetMap = new Map(assets.map((asset) => [asset.url, asset._id]));
  for (const alias of aliases) assetMap.set(alias.url, alias.assetId);
  const filenameMap = new Map(assets.map((asset) => [asset.originalFilename, asset._id]));
  const findAsset = (url) => assetMap.get(url) || filenameMap.get(decodeURIComponent(basename(new URL(url).pathname)));
  let linked = 0;
  const missing = [];
  for (const product of products) {
    for (const image of product.sourceImages) {
      if (!findAsset(image.url)) missing.push({ product: product._id, url: image.url });
    }
    const images = product.sourceImages
      .map((image) => ({ ...image, assetId: findAsset(image.url) }))
      .filter((image) => image.assetId);
    if (!images.length) continue;
    await client.patch(product._id).set({
      mainImage: {
        _type: "image",
        asset: { _type: "reference", _ref: images[0].assetId },
        alt: images[0].alt,
      },
      galleryImages: images.slice(1).map((image, index) => ({
        _key: `gallery-${index}`,
        _type: "image",
        asset: { _type: "reference", _ref: image.assetId },
        alt: image.alt,
      })),
    }).commit();
    linked += images.length;
  }
  console.log(`Finalized ${products.length} products with ${linked} Sanity image references`);
  if (missing.length) console.log(`Missing image references: ${JSON.stringify(missing)}`);
}

async function auditAssets() {
  const [products, assets, aliases] = await Promise.all([
    client.fetch('*[_type == "product" && defined(sourceImages)]{_id, sourceImages, mainImage, galleryImages, tags}'),
    client.fetch('*[_type == "sanity.imageAsset"]{_id, originalFilename, "url": source.id}'),
    client.fetch('*[_type == "migrationImageAlias"]{url, "assetId": asset._ref}'),
  ]);
  const urls = new Set(assets.map((asset) => asset.url));
  for (const alias of aliases) urls.add(alias.url);
  const filenames = new Set(assets.map((asset) => asset.originalFilename));
  const missing = products.flatMap((product) => product.sourceImages
    .filter((image) => !urls.has(image.url) && !filenames.has(decodeURIComponent(basename(new URL(image.url).pathname))))
    .map((image) => ({ product: product._id, url: image.url })));
  const sourceImageCount = products.reduce((sum, product) => sum + product.sourceImages.length, 0);
  const linkedImageCount = products.reduce((sum, product) => sum + (product.mainImage ? 1 : 0) + (product.galleryImages?.length || 0), 0);
  const incompleteProducts = products.filter((product) =>
    !product.mainImage || 1 + (product.galleryImages?.length || 0) !== product.sourceImages.length
  ).map((product) => product._id);
  console.log(JSON.stringify({
    products: products.length,
    sourceImageCount,
    linkedImageCount,
    taggedProducts: products.filter((product) => product.tags?.length).length,
    assets: assets.length,
    missing,
    incompleteProducts,
  }, null, 2));
}

if (mode === "audit") {
  await auditAssets();
} else if (mode === "finalize") {
  await finalizeProducts();
} else {
  const payload = await readInput();
  if (payload.kind === "metadata") await importMetadata(payload.products);
  else if (payload.kind === "assets") await importAssets(payload.items);
  else if (payload.kind === "tags") await importTags(payload.tags);
  else throw new Error(`Unsupported payload kind: ${payload.kind}`);
}

import { getCliClient } from "sanity/cli";
import { basename } from "node:path";
import { createHash } from "node:crypto";
import { Readable } from "node:stream";

const client = getCliClient({ apiVersion: "2026-10-01" });
const mode = process.argv.includes("--audit") ? "audit" : process.argv.includes("--finalize") ? "finalize" : "stdin";

async function readInput() {
  let input = "";
  for await (const chunk of process.stdin) input += chunk;
  return JSON.parse(input);
}

function pageId(path) {
  return `site-page-${createHash("sha1").update(path).digest("hex")}`;
}

function applyBranding(value = "") {
  return value
    .replace(/yourbottle/gi, "FlaskWholesale")
    .replace(/yourcustombottle\.com/gi, "flaskwholesale.com")
    .replace(/\+?86[\s-]*151[\s-]*5638[\s-]*7073/g, "+86 132 6710 2135")
    .replace(/151[\s-]*5638[\s-]*7073/g, "13267102135")
    .replace(/info@flaskwholesale\.com/gi, "raymond@mategourdwholesale.com");
}

function plainText(value = "") {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;|&apos;/gi, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/\s+/g, " ")
    .trim();
}

function cleanBodyHtml(value = "") {
  return value.replace(/<p>\s*(?:Home|Table of Contents|Wonderful!\s*Share The Page To)\s*<\/p>/gi, "");
}

function summaryFromHtml(html, fallback = "") {
  const paragraphs = [...html.matchAll(/<p>([\s\S]*?)<\/p>/gi)].map((match) => plainText(match[1]));
  const selected = paragraphs.find((paragraph) => paragraph.length >= 55 && !/^(home|table of contents)/i.test(paragraph)) || plainText(fallback);
  if (selected.length <= 280) return selected;
  const shortened = selected.slice(0, 280);
  return `${shortened.slice(0, shortened.lastIndexOf(" "))}…`;
}

async function importContent(items) {
  for (let start = 0; start < items.length; start += 10) {
    const batch = items.slice(start, start + 10);
    await Promise.all(batch.map((item) => client.createOrReplace({
      _id: pageId(item.path),
      _type: "sitePage",
      title: applyBranding(item.title),
      slug: { _type: "slug", current: item.slug },
      path: item.path,
      contentType: item.contentType,
      summary: applyBranding(item.summary),
      bodyHtml: applyBranding(item.bodyHtml),
      publishedAt: item.publishedAt || null,
      sourceUrl: item.sourceUrl,
      sourceImageUrls: item.sourceImageUrls || [],
    })));
    console.log(`Content ${Math.min(start + batch.length, items.length)}/${items.length}`);
  }
}

async function importAssets(items) {
  for (let start = 0; start < items.length; start += 5) {
    const batch = items.slice(start, start + 5);
    await Promise.all(batch.map(async (item) => {
      const existing = await client.fetch('*[_type == "sanity.imageAsset" && source.id == $url][0]{_id}', { url: item.url });
      if (existing?._id) return;
      const bytes = Buffer.from(item.base64, "base64");
      const asset = await client.assets.upload("image", Readable.from(bytes), {
        filename: decodeURIComponent(basename(new URL(item.url).pathname)),
        contentType: item.contentType || "image/jpeg",
        source: { id: item.url, name: "YourCustomBottleSiteContent", url: item.url },
      });
      await client.createOrReplace({
        _id: `migration-image-alias-${createHash("sha1").update(item.url).digest("hex")}`,
        _type: "migrationImageAlias",
        url: item.url,
        asset: { _type: "reference", _ref: asset._id },
      });
    }));
    console.log(`Content assets ${Math.min(start + batch.length, items.length)}/${items.length}`);
  }
}

async function getImageMap() {
  const [assets, aliases] = await Promise.all([
    client.fetch('*[_type == "sanity.imageAsset"]{url, "sourceUrl": source.id}'),
    client.fetch('*[_type == "migrationImageAlias"]{url, "assetUrl": asset->url}'),
  ]);
  const imageMap = new Map(assets.filter((asset) => asset.sourceUrl).map((asset) => [asset.sourceUrl, asset.url]));
  for (const alias of aliases) if (alias.assetUrl) imageMap.set(alias.url, alias.assetUrl);
  return imageMap;
}

async function finalizeContent() {
  const [pages, imageMap] = await Promise.all([
    client.fetch('*[_type == "sitePage"]{_id, bodyHtml, summary, sourceImageUrls}'),
    getImageMap(),
  ]);
  let replacements = 0;
  const missing = [];
  for (const page of pages) {
    const originalHtml = page.bodyHtml || "";
    let html = originalHtml;
    for (const sourceUrl of page.sourceImageUrls || []) {
      const targetUrl = imageMap.get(sourceUrl);
      if (!targetUrl) { missing.push({ page: page._id, url: sourceUrl }); continue; }
      const brandedSourceUrl = applyBranding(sourceUrl);
      const wwwBrandedSourceUrl = brandedSourceUrl.replace("https://flaskwholesale.com/", "https://www.flaskwholesale.com/");
      if (html.includes(sourceUrl) || html.includes(brandedSourceUrl) || html.includes(wwwBrandedSourceUrl)) {
        html = html.replaceAll(sourceUrl, targetUrl).replaceAll(brandedSourceUrl, targetUrl).replaceAll(wwwBrandedSourceUrl, targetUrl);
        replacements += 1;
      }
    }
    html = cleanBodyHtml(applyBranding(html)).replaceAll("https://flaskwholesale.com/", "https://www.flaskwholesale.com/");
    const summary = summaryFromHtml(html, page.summary);
    if (html !== originalHtml || summary !== page.summary) await client.patch(page._id).set({ bodyHtml: html, summary }).commit();
  }
  console.log(JSON.stringify({ pages: pages.length, replacements, missing }, null, 2));
}

async function auditContent() {
  const pages = await client.fetch('*[_type == "sitePage"]{_id, path, bodyHtml, sourceImageUrls}');
  const externalImages = pages.filter((page) => /<img[^>]+(?:yourcustombottle\.com|flaskwholesale\.com\/wp-content)/i.test(page.bodyHtml || "")).map((page) => page.path);
  const oldBranding = pages.filter((page) => /YourBottle|15156387073|info@yourcustombottle\.com/i.test(page.bodyHtml || "")).map((page) => page.path);
  console.log(JSON.stringify({ pages: pages.length, sourceImageReferences: pages.reduce((sum, page) => sum + (page.sourceImageUrls?.length || 0), 0), externalImages, oldBranding }, null, 2));
}

if (mode === "finalize") await finalizeContent();
else if (mode === "audit") await auditContent();
else {
  const payload = await readInput();
  if (payload.kind === "content") await importContent(payload.items);
  else if (payload.kind === "contentAssets") await importAssets(payload.items);
  else throw new Error(`Unsupported payload kind: ${payload.kind}`);
}

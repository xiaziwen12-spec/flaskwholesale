import { getCliClient } from "sanity/cli";
import { createReadStream, readFileSync } from "node:fs";
import { basename } from "node:path";

const client = getCliClient({ apiVersion: "2026-10-01" });
const manifests = process.argv.filter((value) => value.endsWith("manifest.json"));
if (manifests.length !== 2) throw new Error("Pass the core and feature manifest paths.");

const assets = manifests.flatMap((path) => JSON.parse(readFileSync(path, "utf8")).assets);
const byUrl = new Map(assets.map((asset) => [asset.url, asset]));

const cards = [
  { kind: "core", slug: "water-bottles", title: "Insulated Water Bottles", description: "Versatile bottle designs", href: "/product-category/water-bottles", order: 1, url: "https://yourcustombottle.com/wp-content/uploads/2025/12/Assorted-stainless-steel-insulated-water-bottles-with-multiple-lid-styles-and-finishes-for-OEM-and-private-label-manufacturing.jpg", alt: "Assorted stainless steel insulated water bottles with multiple lid styles and finishes for OEM and private label manufacturing" },
  { kind: "core", slug: "tumblers-mugs", title: "Insulated Tumblers & Mugs", description: "Multiple tumbler style options", href: "/product-category/tumblers-mugs", order: 2, url: "https://yourcustombottle.com/wp-content/uploads/2025/12/Assorted-stainless-steel-insulated-tumblers-and-mugs-with-multiple-lid-styles-for-OEM-and-private-label-manufacturing.jpg", alt: "Assorted stainless steel insulated tumblers and mugs with multiple lid styles for OEM and private label manufacturing" },
  { kind: "core", slug: "shaker-bottles", title: "Insulated Shaker Bottles", description: "Multiple shaker design options", href: "/product-category/shaker-bottles", order: 3, url: "https://yourcustombottle.com/wp-content/uploads/2025/12/Stainless-steel-insulated-shaker-bottles-with-multiple-lid-styles-for-OEM-and-private-label-manufacturing.jpg", alt: "Stainless steel insulated shaker bottles with multiple lid styles for OEM and private label manufacturing" },
  { kind: "core", slug: "water-jugs", title: "Insulated Water Jugs", description: "Large-capacity insulated drinkware", href: "/product-category/water-jugs", order: 4, url: "https://yourcustombottle.com/wp-content/uploads/2025/12/Stainless-steel-insulated-water-jugs-for-OEM-and-private-label-brands.jpg", alt: "Stainless steel insulated water jugs for OEM and private label brands" },
  { kind: "core", slug: "can-coolers", title: "Insulated Can Coolers", description: "Versatile can cooler designs", href: "/product-category/can-coolers", order: 5, url: "https://yourcustombottle.com/wp-content/uploads/2025/12/Stainless-steel-insulated-can-coolers-in-multiple-finishes-for-OEM-promotional-and-private-label-manufacturing.jpg", alt: "Stainless steel insulated can coolers in multiple finishes for OEM, promotional, and private label manufacturing" },
  { kind: "core", slug: "oem-custom-development", title: "OEM & Custom Development", description: "Tailored manufacturing for unique brands", href: "/stainless-steel-drinkware-custom-solutions", order: 6, url: "https://yourcustombottle.com/wp-content/uploads/2025/12/Custom-stainless-steel-insulated-drinkware-manufacturing-for-OEM-and-private-label-projects.jpg", alt: "Custom stainless steel insulated drinkware manufacturing for OEM and private label projects" },
  { kind: "feature", slug: "freesip-insulated-bottles", title: "Dual-Function Lid Bottles", description: "Dual sip and straw lid systems", href: "/product-tag/freesip-insulated-bottles", order: 1, url: "https://yourcustombottle.com/wp-content/uploads/2025/12/Stainless-steel-insulated-bottles-with-dual-sip-and-straw-lids-designed-for-versatile-hydration-and-private-label-programs.jpg", alt: "Stainless steel insulated bottles with dual sip and straw lids" },
  { kind: "feature", slug: "coffee-tumblers-for-coffee-shops", title: "Coffee Tumblers", description: "Wholesale and private-label coffee drinkware", href: "/product-tag/coffee-tumblers-for-coffee-shops", order: 2, url: "https://yourcustombottle.com/wp-content/uploads/2026/04/Custom-stainless-steel-insulated-tumblers-collection-in-multiple-colors-and-lid-styles-for-wholesale-and-private-label.jpg", alt: "Custom insulated tumblers in multiple colours and lid styles" },
  { kind: "feature", slug: "rhinestone-water-bottle", title: "Insulated Rhinestone Drinkware", description: "Decorative crystal finishes", href: "/product-tag/rhinestone-water-bottle", order: 3, url: "https://yourcustombottle.com/wp-content/uploads/2025/12/Custom-rhinestone-stainless-steel-tumblers-and-bottles-with-decorative-crystal-finishes-for-private-label-drinkware-collections.jpg", alt: "Rhinestone stainless steel tumblers and bottles" },
  { kind: "feature", slug: "world-cup-custom-insulated-bottles", title: "Soccer Insulated Water Bottles", description: "Football-themed OEM drinkware", href: "/product-tag/world-cup-custom-insulated-bottles", order: 4, url: "https://yourcustombottle.com/wp-content/uploads/2025/12/custom-world-cup-and-football-themed-insulated-water-bottles-and-tumblers-for-OEM-branding.jpg", alt: "World Cup and football themed insulated bottles and tumblers" },
  { kind: "feature", slug: "insulated-smart-water-bottle", title: "Temperature Display Insulated Bottles", description: "Touch-display temperature lids", href: "/product-tag/insulated-smart-water-bottle", order: 5, url: "https://yourcustombottle.com/wp-content/uploads/2025/12/custom-stainless-steel-insulated-smart-water-bottles.jpg", alt: "Custom insulated smart water bottles" },
  { kind: "feature", slug: "wooden-bamboo-lid-insulated-bottles", title: "Wooden & Bamboo Lid Bottles", description: "Natural finishes with OEM options", href: "/product-tag/wooden-bamboo-lid-insulated-bottles", order: 6, url: "https://yourcustombottle.com/wp-content/uploads/2025/12/Stainless-steel-insulated-water-bottles-and-bamboo-travel-mugs-with-wooden-lids-including-metal-handle-bottles-and-bamboo-drinkware-designs.jpg", alt: "Insulated bottles and mugs with wooden and bamboo lids" },
  { kind: "feature", slug: "spout-lid-water-bottle", title: "Spout Lid Water Bottles", description: "Practical insulated spout-lid designs", href: "/product-tag/spout-lid-water-bottle", order: 7, url: "https://yourcustombottle.com/wp-content/uploads/2025/12/Collage-of-six-stainless-steel-insulated-water-bottles-in-different-lid-styles-and-colors-on-a-soft-neutral-background.jpg", alt: "Six insulated water bottles in assorted colours and lid styles" },
];

for (const card of cards) {
  const file = byUrl.get(card.url);
  if (!file) throw new Error(`Missing downloaded image: ${card.url}`);
  let asset = await client.fetch('*[_type == "sanity.imageAsset" && source.id == $url][0]{_id}', { url: card.url });
  if (!asset) asset = await client.assets.upload("image", createReadStream(file.path), { filename: basename(file.name), contentType: file.contentType, source: { id: card.url, name: "YourCustomBottle category image", url: card.url } });
  await client.createOrReplace({
    _id: `category-${card.slug}`,
    _type: "category",
    title: card.title,
    slug: { _type: "slug", current: card.slug },
    kind: card.kind,
    description: card.description,
    href: card.href,
    order: card.order,
    mainImage: { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt: card.alt },
  });
  console.log(`${card.kind} ${card.order}: ${card.title}`);
}

import { createClient } from "@sanity/client";

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "12npkiv4",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-09-30",
};

const client = createClient({ ...sanityConfig, useCdn: true, perspective: "published" });

const fields = `
  "slug": slug.current,
  "category": category->slug.current,
  title,
  description,
  features,
  idealFor,
  specifications[]{label, value},
  tags,
  sourceUrl,
  "image": mainImage.asset->url,
  "imageAlt": mainImage.alt,
  "gallery": galleryImages[]{"url": asset->url, alt}
`;

const normalize = (product) => ({
  ...product,
  description: product.description || "A factory-direct stainless steel drinkware style available for wholesale, custom logo and private-label projects.",
  image: product.image || product.gallery?.[0]?.url || "/assets/placeholder.svg",
  gallery: product.gallery || [],
});

async function fetchProducts(query, params = {}) {
  const result = await client.fetch(query, params, {
    next: { revalidate: 3600, tags: ["sanity-products"] },
  });
  return Array.isArray(result) ? result.map(normalize) : result ? normalize(result) : null;
}

export async function getProducts() {
  return fetchProducts(`*[_type == "product"] | order(order asc, title asc){${fields}}`);
}

export async function getProduct(slug) {
  return fetchProducts(`*[_type == "product" && slug.current == $slug][0]{${fields}}`, { slug });
}

export async function getCategoryProducts(category) {
  return fetchProducts(
    `*[_type == "product" && category->slug.current == $category] | order(order asc, title asc){${fields}}`,
    { category },
  );
}

export async function getTagProducts(tag) {
  return fetchProducts(
    `*[_type == "product" && $tag in tags] | order(order asc, title asc){${fields}}`,
    { tag },
  );
}

import { articles, businessPages, categories, getProducts, site, solutions } from "@/lib/site";

export default async function sitemap() {
  const products = await getProducts();
  const paths = ["/", "/products", "/custom-solutions", "/knowledge-center", "/contact-us", ...Object.keys(categories).map((key)=>`/product-category/${key}`), ...products.map((product)=>`/product/${product.slug}`), ...Object.keys(solutions).map((slug)=>`/custom-solutions/${slug}`), ...Object.keys(articles).map((slug)=>`/knowledge-center/${slug}`), ...Object.keys(businessPages).map((slug)=>`/${slug}`)];
  return paths.map((path) => ({ url: `${site.origin}${path}`, changeFrequency: path.startsWith("/product/") ? "weekly" : "monthly", priority: path === "/" ? 1 : 0.7 }));
}

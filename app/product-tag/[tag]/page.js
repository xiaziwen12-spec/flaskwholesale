import { notFound } from "next/navigation";
import Cta from "@/components/Cta";
import PageHero from "@/components/PageHero";
import { ProductGrid } from "@/components/ProductCard";
import { featureCategories, getTagProducts } from "@/lib/site";

export const revalidate = 86400;
export const dynamicParams = true;
export async function generateStaticParams() { return []; }

export async function generateMetadata({ params }) {
  const { tag: key } = await params;
  const category = featureCategories[key];
  return category ? { title: category.title, description: category.copy } : {};
}

export default async function ProductTagPage({ params }) {
  const { tag: key } = await params;
  const category = featureCategories[key];
  if (!category) notFound();
  const products = await getTagProducts(key);
  return <><PageHero eyebrow="Feature category" title={category.title} copy={category.copy} crumb={category.name} /><section className="section"><div className="container"><div className="section-head"><div><span className="eyebrow">{products.length} available styles</span><h2>Choose a product for your project.</h2></div><p>Ask about stock colours, logo methods, packaging and shipping to your destination.</p></div><ProductGrid products={products} /></div></section><Cta /></>;
}

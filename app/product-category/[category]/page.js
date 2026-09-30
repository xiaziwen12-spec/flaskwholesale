import { notFound } from "next/navigation";
import Cta from "@/components/Cta";
import PageHero from "@/components/PageHero";
import { ProductGrid } from "@/components/ProductCard";
import { categories, getCategoryProducts } from "@/lib/site";

export const revalidate = 86400;
export const dynamicParams = true;
export async function generateStaticParams() { return []; }

export async function generateMetadata({ params }) {
  const { category: key } = await params;
  const category = categories[key];
  return category ? { title: category.title, description: category.copy } : {};
}

export default async function CategoryPage({ params }) {
  const { category: key } = await params;
  const category = categories[key];
  if (!category) notFound();
  const products = getCategoryProducts(key);
  return <><PageHero eyebrow="Product category" title={category.title} copy={category.copy} crumb={category.name} /><section className="section"><div className="container"><div className="section-head"><div><span className="eyebrow">{products.length} available styles</span><h2>Choose a base product for your project.</h2></div><p>Ask about stock colours, logo methods, packaging and shipping to your destination.</p></div><ProductGrid products={products} /></div></section><section className="section alt"><div className="container"><div className="process">{[["Reliable quality","Food-grade materials, insulation checks, leak tests and coating inspection."],["Flexible MOQ","Selected logo orders can start from 50 pieces."],["Fast sampling","Typical samples are prepared in 3–7 days."],["OEM support","Custom colour, logo, packaging, lid and mould development."]].map(([title,copy])=><div className="process-card" key={title}><h3>{title}</h3><p>{copy}</p></div>)}</div></div></section><Cta /></>;
}

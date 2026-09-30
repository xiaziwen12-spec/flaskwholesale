import Cta from "@/components/Cta";
import PageHero from "@/components/PageHero";
import { ProductGrid } from "@/components/ProductCard";
import { categories, products } from "@/lib/site";
import Link from "next/link";

export const metadata = { title: "Wholesale Stainless Steel Drinkware", description: "Browse 100 stainless steel drinkware styles for wholesale, OEM, private label and custom branding." };
export const revalidate = 86400;

export default function ProductsPage() {
  return <><PageHero eyebrow="Wholesale catalogue" title="100 custom drinkware styles" copy="Explore our range of stainless steel bottles, tumblers, mugs, shaker bottles, water jugs and can coolers." crumb="Products" /><section className="section"><div className="container"><div className="filter-row"><span className="pill active">All products</span>{Object.entries(categories).map(([key, item]) => <Link className="pill" href={`/product-category/${key}`} key={key}>{item.name}</Link>)}</div><ProductGrid products={products} /></div></section><Cta /></>;
}

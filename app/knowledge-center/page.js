import Link from "next/link";
import PageHero from "@/components/PageHero";
import { articles } from "@/lib/site";

export const metadata = { title: "Knowledge Center", description: "Practical custom stainless steel drinkware guides for buyers and private-label brands." };
export const revalidate = 86400;

export default function KnowledgePage() {
  return <><PageHero eyebrow="Buyer resources" title="Knowledge Center" copy="Practical guides for custom drinkware selection, branding, quality control, packaging and delivery." crumb="Knowledge Center" /><section className="section"><div className="container"><div className="grid">{Object.entries(articles).map(([slug,[title,copy]])=><Link className="process-card" href={`/knowledge-center/${slug}`} key={slug}><span className="eyebrow">Guide</span><h3>{title}</h3><p>{copy}</p><span className="text-link">Read guide →</span></Link>)}</div></div></section></>;
}

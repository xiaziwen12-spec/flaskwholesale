import Link from "next/link";
import PageHero from "@/components/PageHero";
import { getArticles } from "@/lib/sanity";

export const metadata = { title: "Knowledge Center", description: "Practical custom stainless steel drinkware guides for buyers and private-label brands." };
export const revalidate = 86400;

export default async function KnowledgePage() {
  const articles = await getArticles();
  return <><PageHero eyebrow="Buyer resources" title="Knowledge Center" copy="Practical guides for custom drinkware selection, branding, quality control, packaging and delivery." crumb="Knowledge Center" /><section className="section"><div className="container"><div className="grid">{articles.map((article)=><Link className="process-card" href={article.path} key={article.slug}><span className="eyebrow">{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" }) : "Guide"}</span><h3>{article.title}</h3><p>{article.summary}</p><span className="text-link">Read guide →</span></Link>)}</div></div></section></>;
}

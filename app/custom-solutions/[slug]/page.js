import { notFound } from "next/navigation";
import Cta from "@/components/Cta";
import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/QuoteForm";
import { solutions } from "@/lib/site";

export const revalidate = 86400;
export const dynamicParams = true;
export async function generateStaticParams() { return []; }

export async function generateMetadata({ params }) {
  const { slug } = await params; const item = solutions[slug];
  return item ? { title: item[0], description: item[1] } : {};
}

export default async function SolutionPage({ params }) {
  const { slug } = await params; const item = solutions[slug]; if (!item) notFound();
  const [title, copy] = item;
  return <><PageHero eyebrow="Custom solution" title={title} copy={copy} crumb={title} /><section className="section"><div className="container"><div className="split"><div className="content"><h2>A practical solution for your project</h2><p>{copy} Our team will recommend an approach based on your chosen product, artwork, target quantity, retail channel and delivery deadline.</p><h3>What we can coordinate</h3><ul className="checklist"><li>Feasibility review and clear MOQ guidance</li><li>Artwork, colour or structure confirmation</li><li>Pre-production sample and approval</li><li>Quality checkpoints during production</li><li>Packaging and international delivery planning</li></ul></div><QuoteForm /></div></div></section><Cta /></>;
}

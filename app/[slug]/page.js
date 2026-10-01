import { notFound } from "next/navigation";
import Cta from "@/components/Cta";
import PageHero from "@/components/PageHero";
import ContentPage from "@/components/ContentPage";
import { businessPages } from "@/lib/site";
import { getSitePage } from "@/lib/sanity";

export const revalidate = 86400;
export const dynamicParams = true;
export async function generateStaticParams() { return []; }

export async function generateMetadata({ params }) { const { slug } = await params; const migrated = await getSitePage(`/${slug}`); const page = migrated || businessPages[slug]; return page ? { title:page.title, description:page.summary || page.description } : {}; }

export default async function BusinessPage({ params }) {
  const { slug } = await params; const migrated = await getSitePage(`/${slug}`); if (migrated) return <ContentPage page={migrated} />; const page = businessPages[slug]; if (!page) notFound();
  return <><PageHero eyebrow="FlaskWholesale" title={page.title} copy={page.description} crumb={page.title} /><section className="section"><div className="container content"><h2>{page.heading}</h2>{page.paragraphs.map((paragraph)=><p key={paragraph}>{paragraph}</p>)}{page.bullets.length > 0 && <ul className="checklist">{page.bullets.map((bullet)=><li key={bullet}>{bullet}</li>)}</ul>}</div></section><Cta /></>;
}

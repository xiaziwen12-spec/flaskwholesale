import { notFound } from "next/navigation";
import Cta from "@/components/Cta";
import PageHero from "@/components/PageHero";
import ContentPage from "@/components/ContentPage";
import { articles } from "@/lib/site";
import { getSitePageBySlug } from "@/lib/sanity";

export const revalidate = 86400;
export const dynamicParams = true;
export async function generateStaticParams() { return []; }

export async function generateMetadata({ params }) { const { slug } = await params; const migrated = await getSitePageBySlug(slug); const item = articles[slug]; return migrated ? { title:migrated.title, description:migrated.summary } : item ? { title:item[0], description:item[1] } : {}; }

export default async function ArticlePage({ params }) {
  const { slug } = await params; const migrated = await getSitePageBySlug(slug); if (migrated) return <ContentPage page={migrated} />; const item = articles[slug]; if (!item) notFound(); const [title,description] = item;
  return <><PageHero eyebrow="Buyer guide" title={title} copy={description} crumb={title} /><section className="section"><article className="container content"><p className="lead">{description}</p><h2>Start with the commercial objective</h2><p>The best specification is the one that fits your target market, order quantity, expected retail price and delivery deadline. Confirm the product structure first, then select branding and packaging that add visible value without creating unnecessary cost.</p><h2>Confirm the critical details</h2><ul className="checklist"><li>Product capacity, lid function and material structure</li><li>Target quantity and acceptable MOQ</li><li>Logo artwork, colour count and durability requirement</li><li>Stock colour or Pantone colour development</li><li>Packaging level, labels and barcode needs</li><li>Destination, deadline and preferred shipping method</li></ul><h2>Use samples to remove uncertainty</h2><p>A pre-production sample creates a clear reference for product function, surface appearance, logo position and packaging. Bulk production should begin only after the agreed sample or digital proof is approved.</p></article></section><Cta /></>;
}

import Cta from "@/components/Cta";
import PageHero from "@/components/PageHero";

export default function ContentPage({ page, eyebrow }) {
  return <>
    <PageHero eyebrow={eyebrow || (page.contentType === "post" ? "Buyer guide" : page.contentType === "case" ? "Customer case" : "FlaskWholesale")} title={page.title} copy={page.summary} crumb={page.title} />
    <section className="section"><article className="container content migrated-content" dangerouslySetInnerHTML={{ __html: page.bodyHtml || "" }} /></section>
    <Cta />
  </>;
}

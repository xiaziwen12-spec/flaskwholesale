import Link from "next/link";
import Cta from "@/components/Cta";
import PageHero from "@/components/PageHero";
import { solutions } from "@/lib/site";

export const metadata = { title: "Custom Drinkware Solutions", description: "Custom logo, colour, packaging, surface finishing, private label and mould development for stainless steel drinkware." };
export const revalidate = 86400;

export default function SolutionsPage() {
  return <><PageHero eyebrow="OEM & ODM" title="Custom drinkware solutions" copy="A clear path from a stock bottle with your logo to a fully developed private-label collection." crumb="Custom Solutions" /><section className="section"><div className="container"><div className="grid">{Object.entries(solutions).map(([slug,[title,copy]],index)=><Link className="process-card" href={`/custom-solutions/${slug}`} key={slug}><span className="eyebrow">0{index+1}</span><h3>{title}</h3><p>{copy}</p><span className="text-link">Learn more →</span></Link>)}</div></div></section><section className="section alt"><div className="container"><div className="section-head"><div><span className="eyebrow">Low-MOQ launch path</span><h2>Scale customization with demand.</h2></div></div><div className="process">{[["50 pcs","Selected stock bottle styles with laser or UV logo customization."],["100 pcs","Add branded white or kraft packaging to selected logo orders."],["500 pcs","Retail labels, enhanced printing and coordinated packaging."],["1,000+ pcs","Pantone colour development and broader OEM options."]].map(([title,copy])=><div className="process-card" key={title}><h3>{title}</h3><p>{copy}</p></div>)}</div></div></section><Cta /></>;
}

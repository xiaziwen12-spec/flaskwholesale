import Link from "next/link";
import PageHero from "@/components/PageHero";

export default function NotFound() {
  return <><PageHero eyebrow="404" title="Page not found" copy="The page may have moved. Explore our product catalogue or contact our team." crumb="Not found" /><section className="section"><div className="container actions"><Link className="button" href="/products">Explore products</Link><Link className="button secondary" href="/contact-us">Contact us</Link></div></section></>;
}

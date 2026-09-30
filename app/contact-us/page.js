import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/QuoteForm";
import { site } from "@/lib/site";

export const metadata = { title: "Contact FlaskWholesale", description: `Request a quote from FlaskWholesale on WhatsApp ${site.phone}.` };

export default function ContactPage() {
  return <><PageHero eyebrow="Contact" title="Start your custom drinkware project" copy="Send your product, logo, quantity, packaging and delivery requirements. We will help you choose the most practical route." crumb="Contact" /><section className="section"><div className="container"><div className="split"><div><span className="eyebrow">Fast contact</span><h2>Talk directly with our team.</h2><p>For the quickest response, contact us on WhatsApp. Include a product link or screenshot, required quantity, destination country or postcode, and any logo or packaging files.</p><div className="actions"><a className="button" href={site.whatsapp}>WhatsApp {site.phone}</a></div><ul className="checklist"><li>Product recommendation and quotation</li><li>Logo and packaging feasibility</li><li>Sample and production timeline</li><li>Shipping options to your destination</li></ul></div><QuoteForm /></div></div></section></>;
}

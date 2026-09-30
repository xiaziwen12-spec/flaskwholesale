import Link from "next/link";

export default function Cta() {
  return <section className="section"><div className="container"><div className="cta"><div><span className="eyebrow" style={{color:"#fff"}}>Start your project</span><h2>Ready to build your drinkware line?</h2><p>Send your product, logo, quantity and delivery market. We will reply with practical options and factory-direct pricing.</p></div><Link className="button light" href="/contact-us">Request a quote</Link></div></div></section>;
}

import Link from "next/link";
import { categories, site } from "@/lib/site";

export default function Footer() {
  return <>
    <footer className="footer"><div className="container"><div className="footer-grid">
      <div><Link className="brand" href="/"><span className="brand-mark">F</span><span>FlaskWholesale</span></Link><p>OEM & ODM stainless steel drinkware manufacturer supplying bottles, tumblers, mugs, shakers, jugs and can coolers with flexible customisation and global delivery.</p><a href={site.whatsapp}>{site.phone}</a></div>
      <div><h4>Company</h4><div className="footer-links"><Link href="/about-us">About</Link><Link href="/cases">Cases</Link><Link href="/payment-terms">Payment Terms</Link><Link href="/shipping-and-delivery">Shipping & Delivery</Link><Link href="/contact-us">Contact</Link></div></div>
      <div><h4>Products</h4><div className="footer-links">{Object.entries(categories).map(([key, item]) => <Link href={`/product-category/${key}`} key={key}>{item.name}</Link>)}</div></div>
      <div><h4>Resources</h4><div className="footer-links"><Link href="/manufacturing-process">Manufacturing Process</Link><Link href="/quality-control-testing">Quality Control</Link><Link href="/faq">FAQ</Link><Link href="/privacy-policy">Privacy</Link><Link href="/sitemap.xml">Sitemap</Link></div></div>
    </div><div className="copyright">© 2026 FlaskWholesale. All rights reserved.</div></div></footer>
    <a className="whatsapp" href={`${site.whatsapp}?text=Hello%20FlaskWholesale%2C%20I%20would%20like%20a%20quote.`} aria-label="Chat on WhatsApp">WA</a>
  </>;
}

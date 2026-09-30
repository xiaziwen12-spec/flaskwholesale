"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  return <>
    <div className="topbar"><div className="container"><span>OEM & ODM stainless steel drinkware manufacturer</span><a href={site.whatsapp}>WhatsApp {site.phone}</a></div></div>
    <header className="header"><div className="container nav">
      <Link className="brand" href="/"><span className="brand-mark">F</span><span>FlaskWholesale</span></Link>
      <button className="menu-button" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(!open)}>☰</button>
      <nav className={`menu ${open ? "is-open" : ""}`} onClick={() => setOpen(false)}>
        <Link href="/">Home</Link><Link href="/products">Products</Link><Link href="/custom-solutions">Custom Solutions</Link><Link href="/about-us">About Us</Link><Link href="/knowledge-center">Knowledge Center</Link><Link href="/contact-us">Contact</Link>
      </nav>
      <Link className="button" href="/contact-us">Get a Quote</Link>
    </div></header>
  </>;
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";

const menus = [
  {
    label: "Products",
    href: "/products",
    columns: [
      { title: "Product Categories", links: [["Water Bottles", "/product-category/water-bottles"], ["Tumblers and Mugs", "/product-category/tumblers-mugs"], ["Shaker Bottles", "/product-category/shaker-bottles"], ["Water Jugs", "/product-category/water-jugs"], ["Can Coolers", "/product-category/can-coolers"]] },
      { title: "Feature Categories", links: [["Dual-Sip Lid Bottles", "/product-tag/dual-sip-lid-insulated-bottles"], ["Rhinestone Bottles", "/product-tag/rhinestone-water-bottle"], ["Soccer Bottles", "/product-tag/soccer-insulated-water-bottles"], ["Smart Bottles", "/product-tag/insulated-smart-water-bottle"], ["Bamboo Lid Bottles", "/product-tag/wooden-bamboo-lid-insulated-bottles"], ["Spout Lid Bottles", "/product-tag/spout-lid-water-bottle"], ["Coffee Shop Tumblers", "/product-tag/coffee-tumblers-for-coffee-shops"], ["Christmas Cups", "/product-tag/christmas-insulated-cups"]] },
    ],
  },
  {
    label: "Custom Solutions",
    href: "/custom-solutions",
    columns: [
      { title: "Branding", links: [["Private Label", "/custom-solutions/private-label"], ["Custom Logo", "/custom-solutions/custom-logo"], ["UV Printing", "/custom-solutions/uv-printing"], ["Silkscreen Printing", "/custom-solutions/silkscreen-printing"], ["Laser Engraving", "/custom-solutions/laser-engraving"]] },
      { title: "Product Development", links: [["Surface Finishing", "/custom-solutions/surface-finishing"], ["Spray Painting", "/custom-solutions/spray-painting"], ["Powder Coating", "/custom-solutions/powder-coating"], ["Rhinestone Decoration", "/custom-solutions/rhinestone-decoration"], ["Custom Mould", "/custom-solutions/custom-mold"], ["Custom Colour", "/custom-solutions/custom-color"], ["Packaging Solutions", "/custom-solutions/packaging-solutions"]] },
    ],
  },
  {
    label: "About Us",
    href: "/about-us",
    columns: [
      { title: "Company", links: [["About Us", "/about-us"], ["Payment Terms", "/payment-terms"], ["Shipping & Delivery", "/shipping-and-delivery"], ["Cases", "/cases"]] },
      { title: "Manufacturing Process", links: [["Process Overview", "/manufacturing-process"], ["Material Preparation", "/material-preparation"], ["Bottle Body Forming", "/bottle-body-forming"], ["Welding Process", "/welding-process"], ["Vacuum Extraction", "/vacuum-extraction"], ["Electrolytic Cleaning", "/electrolytic-cleaning"], ["Polishing & Colouring", "/polishing-and-coloring"], ["Lid Injection Moulding", "/lid-injection-molding"]] },
    ],
  },
  {
    label: "Knowledge Center",
    href: "/knowledge-center",
    columns: [{ title: "Buyer Resources", links: [["Knowledge Center", "/knowledge-center"], ["Manufacturing Methods", "/manufacturing-methods"], ["Quality Control & Testing", "/quality-control-testing"], ["Buyer Reference & Technical Knowledge", "/buyer-reference-technical-knowledge"], ["FAQ & Help Center", "/faq"]] }],
  },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return <>
    <div className="topbar"><div className="container"><span>OEM & ODM stainless steel drinkware manufacturer</span><a href={site.whatsapp}>WhatsApp {site.phone}</a></div></div>
    <header className="header"><div className="container nav">
      <Link className="brand" href="/"><span className="brand-mark">F</span><span>FlaskWholesale</span></Link>
      <button className="menu-button" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(!open)}>☰</button>
      <nav className={`menu ${open ? "is-open" : ""}`}>
        <Link href="/" onClick={() => setOpen(false)}>Home</Link>
        {menus.map((menu) => <div className={`nav-group ${menu.columns.length > 1 ? "wide" : ""}`} key={menu.label}>
          <Link href={menu.href} onClick={() => setOpen(false)}>{menu.label}<span className="nav-chevron">⌄</span></Link>
          <div className="dropdown">{menu.columns.map((column) => <div key={column.title}><strong>{column.title}</strong>{column.links.map(([label, href]) => <Link href={href} onClick={() => setOpen(false)} key={href}>{label}</Link>)}</div>)}</div>
        </div>)}
        <Link href="/contact-us" onClick={() => setOpen(false)}>Contact Us</Link>
      </nav>
      <Link className="button" href="/contact-us">Get a Quote</Link>
    </div></header>
  </>;
}

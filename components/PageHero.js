import Link from "next/link";

export default function PageHero({ eyebrow, title, copy, crumb }) {
  return <section className="page-hero"><div className="container">
    {crumb && <div className="breadcrumbs"><Link href="/">Home</Link> · {crumb}</div>}
    <span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{copy}</p>
  </div></section>;
}

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/ProductCard";
import QuoteForm from "@/components/QuoteForm";
import { categories, getCategoryProducts, getProduct, site } from "@/lib/site";

export const revalidate = 86400;
export const dynamicParams = true;
export async function generateStaticParams() { return []; }

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  return product ? { title: product.title, description: `${product.title} for wholesale, custom logo, OEM and private-label projects from FlaskWholesale.` } : {};
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  const category = categories[product.category];
  const related = (await getCategoryProducts(product.category)).filter((item) => item.slug !== slug).slice(0, 4);
  const message = encodeURIComponent(`Hello FlaskWholesale, I would like a quote for ${product.title}.`);
  return <>
    <section className="section"><div className="container"><div className="breadcrumbs"><Link href="/">Home</Link> · <Link href={`/product-category/${product.category}`}>{category.name}</Link> · {product.title}</div><div className="product-detail"><div className="product-main-image"><Image src={product.image} alt={product.title} width={900} height={900} priority /></div><div className="product-info"><span className="eyebrow">Custom {category.name}</span><h1>{product.title}</h1><p className="lead">{product.description}</p><div className="feature-list"><div className="feature"><strong>Low MOQ</strong><br />From 50 pcs for selected logo orders</div><div className="feature"><strong>Custom Branding</strong><br />Laser, screen and UV printing</div><div className="feature"><strong>Food Grade</strong><br />304 stainless steel options</div><div className="feature"><strong>Global Delivery</strong><br />Express, air and sea freight</div></div><div className="actions"><a className="button" href={`${site.whatsapp}?text=${message}`}>Chat on WhatsApp</a><a className="button secondary" href="#quote">Get a quote</a></div><table className="spec-table"><tbody><tr><td>Product</td><td>{product.title}</td></tr><tr><td>Material</td><td>Food-grade stainless steel; specification confirmed per model</td></tr><tr><td>Customization</td><td>Logo, colour, packaging and selected structural options</td></tr><tr><td>MOQ</td><td>From 50 pcs for selected stock-model logo orders</td></tr><tr><td>Sampling</td><td>Typically 3–7 days after artwork confirmation</td></tr><tr><td>Lead time</td><td>Confirmed according to quantity and customization</td></tr></tbody></table></div></div></div></section>
    <section className="section alt"><div className="container"><div className="split"><div className="content"><span className="eyebrow">OEM & private label</span><h2>Make this product your own.</h2><p>Choose a practical stock configuration for a fast start, or develop a coordinated product collection with colours, logos, labels and retail packaging.</p><ul className="checklist"><li>Laser engraving, screen printing and UV printing</li><li>Stock colours and Pantone colour development</li><li>White boxes, kraft boxes, gift boxes and retail labels</li><li>Sample confirmation before bulk production</li><li>Inspection photos and delivery coordination</li></ul></div><div id="quote"><QuoteForm /></div></div></div></section>
    <section className="section"><div className="container"><div className="section-head"><div><span className="eyebrow">Related products</span><h2>More in {category.name}</h2></div></div><ProductGrid products={related} /></div></section>
  </>;
}

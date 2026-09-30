import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/site";

export function ProductCard({ product, priority = false }) {
  return <Link className="product-card" href={`/product/${product.slug}`}>
    <Image src={product.image} alt={product.title} width={720} height={720} priority={priority} sizes="(max-width: 580px) 100vw, (max-width: 900px) 50vw, 25vw" />
    <div className="product-card-copy"><span className="tag">{categories[product.category].name}</span><h3>{product.title}</h3><span className="text-link">View product →</span></div>
  </Link>;
}

export function ProductGrid({ products }) {
  return <div className="products">{products.map((product) => <ProductCard product={product} key={product.slug} />)}</div>;
}

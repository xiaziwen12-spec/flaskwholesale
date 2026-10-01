"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ product }) {
  const images = [
    { url: product.image, alt: product.imageAlt || product.title },
    ...(product.gallery || []),
  ].filter((image, index, list) => image?.url && list.findIndex((item) => item?.url === image.url) === index);
  const [active, setActive] = useState(0);
  const selected = images[active] || images[0];

  return <div className="product-gallery">
    <div className="product-main-image">
      <Image
        src={selected.url}
        alt={selected.alt || product.title}
        width={1200}
        height={1200}
        priority
        sizes="(max-width: 900px) 100vw, 50vw"
      />
    </div>
    {images.length > 1 && <div className="product-thumbnails" aria-label="Product images">
      {images.map((image, index) => <button
        className={index === active ? "active" : ""}
        type="button"
        key={image.url}
        onClick={() => setActive(index)}
        aria-label={`View image ${index + 1} of ${images.length}`}
      >
        <Image src={image.url} alt={image.alt || product.title} width={150} height={150} sizes="82px" />
      </button>)}
    </div>}
  </div>;
}

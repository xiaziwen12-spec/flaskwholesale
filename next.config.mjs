const nextConfig = {
  agentRules: false,
  allowedDevOrigins: ["127.0.0.1"],
  images: { unoptimized: true },
  async redirects() {
    return [
      { source: "/product", destination: "/products", permanent: true },
      { source: "/product/page/:page", destination: "/products/page/:page", permanent: true },
      { source: "/product-category/water-bottle", destination: "/product-category/water-bottles", permanent: true },
      { source: "/product-category/stainless-steel-tumblers", destination: "/product-category/tumblers-mugs", permanent: true },
      { source: "/cases", destination: "/case", permanent: true },
      { source: "/custom-solutions", destination: "/stainless-steel-drinkware-custom-solutions", permanent: true },
      { source: "/manufacturing-process", destination: "/insulated-bottle-manufacturing-process", permanent: true },
      { source: "/material-preparation", destination: "/insulated-bottle-manufacturing-process/material-preparation", permanent: true },
      { source: "/bottle-body-forming", destination: "/insulated-bottle-manufacturing-process/bottle-body-forming", permanent: true },
      { source: "/welding-process", destination: "/insulated-bottle-manufacturing-process/welding-process", permanent: true },
      { source: "/vacuum-extraction", destination: "/insulated-bottle-manufacturing-process/vacuum-extraction", permanent: true },
      { source: "/electrolytic-cleaning", destination: "/insulated-bottle-manufacturing-process/electrolytic-cleaning", permanent: true },
      { source: "/polishing-and-coloring", destination: "/insulated-bottle-manufacturing-process/polishing-and-coloring", permanent: true },
      { source: "/lid-injection-molding", destination: "/insulated-bottle-manufacturing-process/lid-injection-molding", permanent: true },
      { source: "/faq", destination: "/wholesale-stainless-steel-bottle-faq", permanent: true },
    ];
  },
};

export default nextConfig;

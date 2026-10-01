import ProductCatalog from "./ProductCatalog";

export const metadata = { title: "Wholesale Stainless Steel Drinkware", description: "Browse 100 stainless steel drinkware styles for wholesale, OEM, private label and custom branding." };
export const revalidate = 3600;

export default function ProductsPage() {
  return <ProductCatalog />;
}

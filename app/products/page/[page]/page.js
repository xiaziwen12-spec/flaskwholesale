import { notFound } from "next/navigation";
import ProductCatalog from "../../ProductCatalog";

export const revalidate = 3600;
export const dynamicParams = true;

export function generateStaticParams() {
  return Array.from({ length: 8 }, (_, index) => ({ page: String(index + 2) }));
}

export async function generateMetadata({ params }) {
  const { page } = await params;
  return { title: `Wholesale Stainless Steel Drinkware – Page ${page}`, description: "Browse the FlaskWholesale stainless steel drinkware catalogue." };
}

export default async function ProductsPageNumber({ params }) {
  const { page } = await params;
  const currentPage = Number.parseInt(page, 10);
  if (!Number.isInteger(currentPage) || currentPage < 2) notFound();
  const content = await ProductCatalog({ currentPage });
  if (!content) notFound();
  return content;
}

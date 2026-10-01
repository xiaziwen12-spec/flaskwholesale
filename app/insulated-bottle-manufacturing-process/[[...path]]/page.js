import { notFound } from "next/navigation";
import ContentPage from "@/components/ContentPage";
import { getSitePage } from "@/lib/sanity";

export const revalidate = 3600;
export const dynamicParams = true;
export async function generateStaticParams() { return []; }

function pagePath(parts) { return `/insulated-bottle-manufacturing-process${parts?.length ? `/${parts.join("/")}` : ""}`; }

export async function generateMetadata({ params }) { const { path } = await params; const page = await getSitePage(pagePath(path)); return page ? { title: page.title, description: page.summary } : {}; }
export default async function ManufacturingPage({ params }) { const { path } = await params; const page = await getSitePage(pagePath(path)); if (!page) notFound(); return <ContentPage page={page} eyebrow="Manufacturing process" />; }

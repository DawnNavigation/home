import type { Metadata } from "next";
import { SiteDetailApp } from "@/components/site-detail-app";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Website details" };

export default async function SitePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <SiteDetailApp siteId={id} />;
}

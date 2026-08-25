import { findSiteById } from "@/lib/webstack";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const site = await findSiteById(Number(id));
    if (!site) return Response.json({ error: "Site not found" }, { status: 404 });
    return Response.json(site, { headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
  } catch (error) {
    console.error(error);
    return Response.json({ error: error instanceof Error ? error.message : "Unable to read site" }, { status: 500 });
  }
}

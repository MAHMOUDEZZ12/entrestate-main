import { NextResponse } from "next/server";

type SubmitBody = {
  toolId: string;
  inputs?: Record<string, any>;
  uid?: string | null;
};

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as SubmitBody;

  if (!body?.toolId) {
    return NextResponse.json({ ok: false, error: "toolId required" }, { status: 400 });
  }

  const now = new Date().toISOString();
  let result: any = { received: body.inputs || {}, at: now };

  switch (body.toolId) {
    case "meta-audit":
      result.summary = "Meta account audit completed (mock).";
      result.findings = [
        "Ad set budget distribution: balanced",
        "Advantage+ usage: partial (recommend enabling for retargeting)",
        "Creative coverage: reels OK, static needs variants",
      ];
      break;
    case "listing-health":
      result.summary = "Listing checks: 12/12 pass (mock).";
      result.flags = [];
      break;
    case "price-estimator":
      result.summary = "Estimated price range: AED 1.45M – 1.6M (mock).";
      break;
    case "brochure-rebrand":
      result.summary = "Brochure rebrand generated (mock URL).";
      result.assetUrl = "/mock/brochure.pdf";
      break;
    default:
      result.summary = `Tool ${body.toolId} executed. (mock)`;
  }

  return NextResponse.json({ ok: true, toolId: body.toolId, result }, { status: 200 });
}

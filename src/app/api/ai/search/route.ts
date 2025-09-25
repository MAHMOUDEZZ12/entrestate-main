
import { NextRequest, NextResponse } from 'next/server';
import { runMarketSearch } from '@/lib/ai/vertex';

// Gemini (server-only) optional import
let GenerativeModel: any = null;
let GoogleGenerativeAI: any = null;
try {
  // dynamic import avoids bundling/client exposure
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  ({ GoogleGenerativeAI } = require('@google/generative-ai'));
} catch {}

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest){
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';
  const mode = (searchParams.get('mode') || 'search').toLowerCase(); // search | synth
  try{
    const results = await runMarketSearch(q);

    if(mode !== 'synth' || !GoogleGenerativeAI){
      return NextResponse.json({ ok: true, query: q, results, mode: 'search' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if(!apiKey){
      return NextResponse.json({ ok: true, query: q, results, note: 'Set GEMINI_API_KEY to enable synthesis', mode: 'search' });
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    // Use a reasoning-friendly model when available (fallback to 1.5-pro)

    const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || 'gemini-1.5-pro' });
    const context = results.map(r => `- ${r.title}: ${r.snippet}`).join('\n');
    const prompt = `You are an AI market analyst for UAE real estate. Summarize the following snippets into:
1) 3-5 bullet insights,
2) a short plan of next actions,
3) a single CTA line.

Query: "${q}"

Snippets:
${context}

Return JSON with keys: insights[], plan[], cta.`;

    const resp = await model.generateContent(prompt);
    const text = resp?.response?.text?.() || '';
    let synthesis: any = { raw: text };
    try { synthesis = JSON.parse(text); } catch {}
    return NextResponse.json({ ok: true, query: q, results, synthesis, mode: 'synth' });
  }catch(e:any){
    return NextResponse.json({ ok: false, error: e?.message || 'AI error' }, { status: 500 });
  }
}

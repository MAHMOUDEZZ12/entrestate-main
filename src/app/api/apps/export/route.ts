
import { NextRequest, NextResponse } from 'next/server';
import { appsRegistry } from '@/lib/apps/io';

function toCSV(){
  const rows: string[] = [];
  rows.push(['id','name','category','status','version','direction','key','label','type','required','description'].join(','));
  for(const app of appsRegistry){
    for(const dir of ['inputs','outputs'] as const){
      for(const f of app[dir]){
        rows.push([
          app.id,
          JSON.stringify(app.name),
          app.category,
          app.status || '',
          app.version || '',
          dir.slice(0,-1), // input/output
          f.key,
          JSON.stringify(f.label),
          f.type,
          String(!!f.required),
          JSON.stringify(f.description || '')
        ].join(','));
      }
    }
  }
  return rows.join('\n');
}

export async function GET(req: NextRequest){
  const { searchParams } = new URL(req.url);
  const format = (searchParams.get('format') || 'json').toLowerCase();
  if(format === 'csv'){
    const csv = toCSV();
    return new NextResponse(csv, {
      headers: {
        'content-type': 'text/csv; charset=utf-8',
        'content-disposition': 'attachment; filename="apps-io.csv"'
      }
    });
  }
  return NextResponse.json({ apps: appsRegistry });
}

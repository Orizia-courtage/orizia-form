import { NextResponse } from 'next/server';
import { fetchCalSlots } from '@/lib/cal-slots.mjs';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const result = await fetchCalSlots(searchParams.get('start'), searchParams.get('end'));
  if (result.error) return NextResponse.json({ error: result.error }, { status: result.status });
  return NextResponse.json({ slots: result.slots });
}

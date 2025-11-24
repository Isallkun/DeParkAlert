import { NextResponse } from 'next/server';
import { getUserStats } from '@/lib/mock-data';

export async function GET(
  request: Request,
  { params }: { params: { address: string } }
) {
  const stats = getUserStats(params.address);

  return NextResponse.json({
    success: true,
    data: stats,
  });
}

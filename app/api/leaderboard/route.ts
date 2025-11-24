import { NextResponse } from 'next/server';
import { mockLeaderboard } from '@/lib/mock-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit');

  let leaderboard = mockLeaderboard;

  // Limit results if provided
  if (limit) {
    leaderboard = mockLeaderboard.slice(0, parseInt(limit));
  }

  return NextResponse.json({
    success: true,
    data: leaderboard,
    total: leaderboard.length,
  });
}

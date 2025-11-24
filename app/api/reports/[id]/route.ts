import { NextResponse } from 'next/server';
import { mockReports } from '@/lib/mock-data';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const report = mockReports.find(r => r.id === params.id);

  if (!report) {
    return NextResponse.json(
      {
        success: false,
        message: 'Report not found',
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: report,
  });
}

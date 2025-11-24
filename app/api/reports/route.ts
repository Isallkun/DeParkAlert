import { NextResponse } from 'next/server';
import { mockReports, getRecentReports, getReportsByStatus } from '@/lib/mock-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const limit = searchParams.get('limit');

  let reports = mockReports;

  // Filter by status if provided
  if (status && (status === 'pending' || status === 'verified' || status === 'rejected')) {
    reports = getReportsByStatus(status);
  }

  // Limit results if provided
  if (limit) {
    reports = getRecentReports(parseInt(limit));
  }

  return NextResponse.json({
    success: true,
    data: reports,
    total: reports.length,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Simulate report creation
    const newReport = {
      id: `report-${Date.now()}`,
      userId: body.userId || 'anonymous',
      walletAddress: body.walletAddress,
      type: body.type,
      category: body.category,
      location: body.location,
      description: body.description,
      imageUrl: body.imageUrl || 'https://picsum.photos/400/300',
      status: 'pending' as const,
      aiConfidence: 85 + Math.random() * 10,
      timestamp: new Date().toISOString(),
    };

    // Add to mock data (in real app, this would save to database)
    mockReports.unshift(newReport);

    return NextResponse.json({
      success: true,
      message: 'Report submitted successfully',
      data: newReport,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to submit report',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// app/api/your-api-route/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.redirect('http://localhost:8888/loginSpotify');
}
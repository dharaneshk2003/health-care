// app/api/bookings/route.ts
import { NextResponse } from "next/server";

let storedBookingData = null; // Will act as temporary in-memory storage

export async function POST(req: Request) {
  const body = await req.json();
  storedBookingData = body;
  console.log("Received booking:", body);
  return NextResponse.json({ success: true, message: "Booking stored successfully" });
}

export async function GET() {
  return NextResponse.json(storedBookingData || { message: "No booking found" });
}

import { mockSurebets } from "@/lib/mockData";
import { NextResponse } from "next/server";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return NextResponse.json(mockSurebets);
}

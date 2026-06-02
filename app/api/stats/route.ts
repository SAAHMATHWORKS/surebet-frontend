import { mockSurebets } from "@/lib/mockData";
import { NextResponse } from "next/server";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const totalSurebets = mockSurebets.length;
  const totalProfit = mockSurebets.reduce((acc, s) => acc + s.actual_profit, 0);
  const maxProfit = Math.max(...mockSurebets.map((s) => s.actual_profit));
  const profitHistory = Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - (6 - i) * 86400000).toLocaleDateString(),
    profit: Math.round(totalProfit * (0.6 + Math.random() * 0.4)),
  }));
  return NextResponse.json({
    totalSurebets,
    totalProfit,
    maxProfit,
    profitHistory,
  });
}

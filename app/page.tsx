"use client";
import { useEffect, useState, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { KpiCard } from "@/components/KpiCard";
import { SurebetCard } from "@/components/SurebetCard";
import { ProfitChart } from "@/components/ProfitChart";
import { SkeletonCard } from "@/components/SkeletonCard";
import {
  TrendingUp,
  DollarSign,
  BarChart3,
  Activity,
  Clock,
} from "lucide-react";
import { mockSurebets } from "@/lib/mockData";
import { motion } from "framer-motion";
import { useScan } from "@/context/ScanContext";
import { formatDistanceToNow } from "date-fns";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalSurebets: 0,
    totalProfit: 0,
    maxProfit: 0,
    profitHistory: [] as { date: string; profit: number }[],
  });
  const [loading, setLoading] = useState(true);
  const { lastScanTime } = useScan();

  const fetchStats = useCallback(() => {
    setLoading(true);
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats, lastScanTime]); // re-fetch quand lastScanTime change

  const lastScanText = lastScanTime
    ? `Last scan: ${formatDistanceToNow(new Date(lastScanTime), { addSuffix: true })}`
    : "No scan performed yet";

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-4xl font-heading font-bold">
              Surebet Dashboard
            </h1>
            <p className="text-muted-foreground">
              Real-time arbitrage opportunities
            </p>
          </motion.div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{lastScanText}</span>
          </div>
        </div>

        {/* KPI Cards avec loader */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={`kpi-skeleton-${i}`} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <KpiCard
              title="Total Surebets"
              value={stats.totalSurebets}
              icon={BarChart3}
            />
            <KpiCard
              title="Total Profit"
              value={stats.totalProfit}
              prefix="€"
              icon={DollarSign}
            />
            <KpiCard
              title="Best Profit"
              value={stats.maxProfit}
              prefix="€"
              icon={TrendingUp}
            />
            <KpiCard title="Active Markets" value={3} icon={Activity} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-heading font-semibold mb-4">
              Profit Evolution
            </h2>
            {loading ? (
              <div className="animate-pulse bg-card/60 rounded-lg border border-border h-[300px]" />
            ) : (
              <ProfitChart data={stats.profitHistory} />
            )}
          </div>
          <div>
            <h2 className="text-xl font-heading font-semibold mb-4">
              Latest Opportunities
            </h2>
            <div className="space-y-4">
              {loading
                ? [...Array(4)].map((_, i) => (
                    <SkeletonCard key={`opp-skeleton-${i}`} />
                  ))
                : mockSurebets
                    .slice(0, 4)
                    .map((sb) => <SurebetCard key={sb.id} surebet={sb} />)}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

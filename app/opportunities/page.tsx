"use client";
import { useState, useMemo, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { SurebetCard } from "@/components/SurebetCard";
import { FilterBar } from "@/components/FilterBar";
import { Pagination } from "@/components/Pagination";
import { SkeletonCard } from "@/components/SkeletonCard";
import { mockSurebets } from "@/lib/mockData";
import { motion } from "framer-motion";

export default function OpportunitiesPage() {
  const [filters, setFilters] = useState({
    sport: "all",
    market: "all",
    minProfit: "",
    sort: "profit-desc",
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const pageSize = 6;

  // Simuler un chargement initial comme si on appelait une API
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    let data = [...mockSurebets];
    if (filters.market !== "all")
      data = data.filter((s) => s.market === filters.market);
    if (filters.sport !== "all")
      data = data.filter((s) =>
        s.sport_label.toLowerCase().includes(filters.sport),
      );
    if (filters.minProfit)
      data = data.filter((s) => s.profit_percent >= Number(filters.minProfit));

    switch (filters.sort) {
      case "profit-asc":
        data.sort((a, b) => a.profit_percent - b.profit_percent);
        break;
      case "profit-desc":
        data.sort((a, b) => b.profit_percent - a.profit_percent);
        break;
      case "date-asc":
        data.sort(
          (a, b) =>
            new Date(a.commence_time).getTime() -
            new Date(b.commence_time).getTime(),
        );
        break;
      case "date-desc":
        data.sort(
          (a, b) =>
            new Date(b.commence_time).getTime() -
            new Date(a.commence_time).getTime(),
        );
        break;
    }
    return data;
  }, [filters]);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-4xl font-heading font-bold mb-2"
        >
          Opportunities
        </motion.h1>
        <p className="text-muted-foreground mb-6">
          Explore all detected surebets
        </p>

        <FilterBar filters={filters} setFilters={setFilters} />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(pageSize)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginated.map((sb, index) => (
                <motion.div
                  key={sb.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <SurebetCard surebet={sb} />
                </motion.div>
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground mt-10">
                No opportunities match your filters.
              </p>
            )}
            <Pagination
              page={page}
              total={filtered.length}
              pageSize={pageSize}
              onChange={setPage}
            />
          </>
        )}
      </main>
    </div>
  );
}

"use client";
import { Surebet } from "@/lib/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowUpRight, DollarSign, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { SurebetDetail } from "./SurebetDetail";
import { format } from "date-fns";

function getProfitBadgeStyle(profit: number) {
  if (profit >= 2.0)
    return "bg-profit/10 text-profit border-profit/30 hover:bg-profit/20";
  if (profit >= 1.0)
    return "bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20";
  if (profit > 0) return "bg-loss/10 text-loss border-loss/30 hover:bg-loss/20";
  return "bg-muted text-muted-foreground border-muted";
}

const sportIcons: Record<string, string> = {
  football: "⚽",
  soccer: "⚽",
  basketball: "🏀",
  baseball: "⚾",
  hockey: "🏒",
  rugby: "🏉",
  cricket: "🏏",
  mma: "🥊",
  boxing: "🥊",
  tennis: "🎾",
  volleyball: "🏐",
  handball: "🤾",
  futsal: "⚽",
};

function getSportIcon(sportLabel: string): string {
  const lower = sportLabel.toLowerCase();
  for (const [key, icon] of Object.entries(sportIcons)) {
    if (lower.includes(key)) return icon;
  }
  return "🏟️"; // icône générique
}

export function SurebetCard({ surebet }: { surebet: Surebet }) {
  const [open, setOpen] = useState(false);
  const marketLabel =
    surebet.market === "h2h" ? "1N2" : surebet.market.toUpperCase();

  const getOddsDisplay = () => {
    if (surebet.market === "h2h") {
      return (
        <div className="flex gap-4 text-sm">
          <span>1: {surebet.best_odds.home?.odds}</span>
          {surebet.best_odds.draw?.odds ? (
            <span>N: {surebet.best_odds.draw.odds}</span>
          ) : null}
          <span>2: {surebet.best_odds.away?.odds}</span>
        </div>
      );
    } else if (surebet.market === "btts") {
      return (
        <div className="text-sm">
          Yes {surebet.best_odds.yes?.odds} / No {surebet.best_odds.no?.odds}
        </div>
      );
    } else {
      return (
        <div className="text-sm">
          O {surebet.best_odds.over?.odds} / U {surebet.best_odds.under?.odds}{" "}
          (Threshold: {surebet.best_odds.threshold})
        </div>
      );
    }
  };

  const sportIcon = getSportIcon(surebet.sport_label);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen(true)}
      >
        <Card className="backdrop-blur-md bg-card/60 border-border hover:border-primary/40 transition-all cursor-pointer">
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-heading font-bold">
                  {surebet.home_team} vs {surebet.away_team}
                </h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span>{sportIcon}</span> {surebet.sport_label}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <Badge
                  variant="outline"
                  className={getProfitBadgeStyle(surebet.profit_percent)}
                >
                  <ArrowUpRight className="w-3 h-3 mr-1" />+
                  {surebet.profit_percent}%
                </Badge>
                <Badge
                  variant="outline"
                  className="border-primary text-primary"
                >
                  {marketLabel}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1 text-neutral">
                <DollarSign className="w-4 h-4" />
                {surebet.actual_profit}€
              </span>
              <span className="flex items-center gap-1 text-neutral">
                <Clock className="w-4 h-4" />
                {format(new Date(surebet.commence_time), "dd/MM/yyyy HH:mm")}
              </span>
            </div>
            <Separator className="my-3" />
            {getOddsDisplay()}
          </CardContent>
        </Card>
      </motion.div>
      <SurebetDetail surebet={surebet} open={open} setOpen={setOpen} />
    </>
  );
}

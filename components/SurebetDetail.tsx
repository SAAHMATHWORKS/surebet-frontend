"use client";
import { Surebet } from "@/lib/mockData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

export function SurebetDetail({
  surebet,
  open,
  setOpen,
}: {
  surebet: Surebet;
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const [copied, setCopied] = useState(false);

  const copyStakes = () => {
    let text = "";
    if (surebet.market === "h2h") {
      text = `Home: ${surebet.stakes.home}€\nDraw: ${surebet.stakes.draw}€\nAway: ${surebet.stakes.away}€`;
    } else {
      text = `Outcome 1: ${surebet.stakes.outcome1}€\nOutcome 2: ${surebet.stakes.outcome2}€`;
    }
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl bg-card/95 backdrop-blur-lg border-border">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">
            {surebet.home_team} vs {surebet.away_team}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {surebet.sport_label} -{" "}
            {format(new Date(surebet.commence_time), "dd/MM/yyyy HH:mm")}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div className="flex gap-4">
            <div className="bg-primary/10 px-3 py-1 rounded-full text-sm">
              Profit: +{surebet.profit_percent}% ({surebet.actual_profit}€)
            </div>
            <div className="bg-muted px-3 py-1 rounded-full text-sm">
              Stake: {surebet.total_stake}€
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Issue</TableHead>
                <TableHead>Odds</TableHead>
                <TableHead>Bookmaker</TableHead>
                <TableHead>Stake</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {surebet.market === "h2h" && (
                <>
                  <TableRow>
                    <TableCell>Home</TableCell>
                    <TableCell>{surebet.best_odds.home?.odds}</TableCell>
                    <TableCell>{surebet.best_odds.home?.bookmaker}</TableCell>
                    <TableCell>{surebet.stakes.home}€</TableCell>
                  </TableRow>
                  {surebet.best_odds.draw?.odds ? (
                    <TableRow>
                      <TableCell>Draw</TableCell>
                      <TableCell>{surebet.best_odds.draw.odds}</TableCell>
                      <TableCell>{surebet.best_odds.draw.bookmaker}</TableCell>
                      <TableCell>{surebet.stakes.draw}€</TableCell>
                    </TableRow>
                  ) : null}
                  <TableRow>
                    <TableCell>Away</TableCell>
                    <TableCell>{surebet.best_odds.away?.odds}</TableCell>
                    <TableCell>{surebet.best_odds.away?.bookmaker}</TableCell>
                    <TableCell>{surebet.stakes.away}€</TableCell>
                  </TableRow>
                </>
              )}
              {surebet.market === "btts" && (
                <>
                  <TableRow>
                    <TableCell>Yes</TableCell>
                    <TableCell>{surebet.best_odds.yes?.odds}</TableCell>
                    <TableCell>{surebet.best_odds.yes?.bookmaker}</TableCell>
                    <TableCell>{surebet.stakes.outcome1}€</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell>{surebet.best_odds.no?.odds}</TableCell>
                    <TableCell>{surebet.best_odds.no?.bookmaker}</TableCell>
                    <TableCell>{surebet.stakes.outcome2}€</TableCell>
                  </TableRow>
                </>
              )}
              {surebet.market === "totals" && (
                <>
                  <TableRow>
                    <TableCell>Over {surebet.best_odds.threshold}</TableCell>
                    <TableCell>{surebet.best_odds.over?.odds}</TableCell>
                    <TableCell>{surebet.best_odds.over?.bookmaker}</TableCell>
                    <TableCell>{surebet.stakes.outcome1}€</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Under {surebet.best_odds.threshold}</TableCell>
                    <TableCell>{surebet.best_odds.under?.odds}</TableCell>
                    <TableCell>{surebet.best_odds.under?.bookmaker}</TableCell>
                    <TableCell>{surebet.stakes.outcome2}€</TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>

          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={copyStakes}>
              {copied ? (
                <Check className="w-4 h-4 mr-1" />
              ) : (
                <Copy className="w-4 h-4 mr-1" />
              )}
              {copied ? "Copied!" : "Copy Stakes"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

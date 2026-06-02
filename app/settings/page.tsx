"use client";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Save, Check } from "lucide-react";

// Liste des bookmakers et sports (extrait du config.py)
const BOOKMAKERS = [
  "Betclic",
  "Unibet",
  "Winamax",
  "PMU",
  "Bwin",
  "Bet365",
  "William Hill",
  "Betfair",
  "Pinnacle",
  "1xBet",
  "Betsson",
  "Ladbrokes",
  "Coral",
  "SkyBet",
  "Paddy Power",
  "888sport",
  "SportPesa",
  "DraftKings",
  "FanDuel",
  "PointsBet",
  "Sportsbet",
  "TAB",
  "Neds",
];

const SPORTS = {
  "⚽ FOOTBALL": [
    { slug: "soccer_france_ligue_one", label: "Ligue 1 (France)" },
    { slug: "soccer_epl", label: "Premier League (Angleterre)" },
    { slug: "soccer_spain_la_liga", label: "La Liga (Espagne)" },
    { slug: "soccer_germany_bundesliga", label: "Bundesliga (Allemagne)" },
    { slug: "soccer_italy_serie_a", label: "Serie A (Italie)" },
    { slug: "soccer_uefa_champs_league", label: "Champions League" },
  ],
  "🏀 BASKETBALL": [
    { slug: "basketball_nba", label: "NBA (USA)" },
    { slug: "basketball_euroleague", label: "EuroLeague" },
  ],
  "⚾ BASEBALL": [{ slug: "baseball_mlb", label: "MLB" }],
  "🏒 HOCKEY": [{ slug: "icehockey_nhl", label: "NHL" }],
};

const EXTRA_MARKETS_OPTIONS = ["btts", "totals", "spreads", "outrights"];

export default function SettingsPage() {
  const [totalStake, setTotalStake] = useState(1000);
  const [minProfitH2H, setMinProfitH2H] = useState(0.1);
  const [minProfitBTTS, setMinProfitBTTS] = useState(0.3);
  const [minProfitTotals, setMinProfitTotals] = useState(0.3);
  const [selectedBookmakers, setSelectedBookmakers] = useState<string[]>(
    BOOKMAKERS.slice(0, 8),
  );
  const [selectedRegions, setSelectedRegions] = useState<string[]>([
    "eu",
    "uk",
  ]);
  const [activeSports, setActiveSports] = useState<string[]>(
    Object.values(SPORTS)
      .flat()
      .map((s) => s.slug),
  );
  const [extraMarkets, setExtraMarkets] = useState<string[]>([
    "btts",
    "totals",
  ]);
  const [saveResults, setSaveResults] = useState(true);
  const [saved, setSaved] = useState(false);

  const toggleBookmaker = (bk: string) => {
    setSelectedBookmakers((prev) =>
      prev.includes(bk) ? prev.filter((b) => b !== bk) : [...prev, bk],
    );
  };

  const toggleRegion = (region: string) => {
    setSelectedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region],
    );
  };

  const toggleSport = (slug: string) => {
    setActiveSports((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  };

  const toggleExtraMarket = (market: string) => {
    setExtraMarkets((prev) =>
      prev.includes(market)
        ? prev.filter((m) => m !== market)
        : [...prev, market],
    );
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-4xl font-heading font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground mb-8">
            Configure your arbitrage engine
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Financial Parameters */}
          <Card className="backdrop-blur-md bg-card/60 border-border">
            <CardHeader>
              <CardTitle className="font-heading text-xl">
                💰 Financial Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium">Total Stake (€)</label>
                <Input
                  type="number"
                  value={totalStake}
                  onChange={(e) => setTotalStake(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">
                    Min Profit H2H (%)
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    value={minProfitH2H}
                    onChange={(e) => setMinProfitH2H(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">
                    Min Profit BTTS (%)
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    value={minProfitBTTS}
                    onChange={(e) => setMinProfitBTTS(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">
                    Min Profit Totals (%)
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    value={minProfitTotals}
                    onChange={(e) => setMinProfitTotals(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bookmakers */}
          <Card className="backdrop-blur-md bg-card/60 border-border">
            <CardHeader>
              <CardTitle className="font-heading text-xl">
                🔖 Trusted Bookmakers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {BOOKMAKERS.map((bk) => (
                  <Badge
                    key={bk}
                    variant={
                      selectedBookmakers.includes(bk) ? "default" : "outline"
                    }
                    className={`cursor-pointer ${
                      selectedBookmakers.includes(bk)
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground border-muted"
                    }`}
                    onClick={() => toggleBookmaker(bk)}
                  >
                    {bk}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Regions */}
          <Card className="backdrop-blur-md bg-card/60 border-border">
            <CardHeader>
              <CardTitle className="font-heading text-xl">🌍 Regions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                {["eu", "uk", "us", "au"].map((region) => (
                  <div key={region} className="flex items-center gap-2">
                    <Switch
                      checked={selectedRegions.includes(region)}
                      onCheckedChange={() => toggleRegion(region)}
                    />
                    <span className="text-sm uppercase">{region}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Extra Markets */}
          <Card className="backdrop-blur-md bg-card/60 border-border">
            <CardHeader>
              <CardTitle className="font-heading text-xl">
                📊 Extra Markets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {EXTRA_MARKETS_OPTIONS.map((market) => (
                  <div key={market} className="flex items-center gap-2">
                    <Switch
                      checked={extraMarkets.includes(market)}
                      onCheckedChange={() => toggleExtraMarket(market)}
                    />
                    <span className="text-sm capitalize">{market}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Sports */}
        <Card className="backdrop-blur-md bg-card/60 border-border mt-8">
          <CardHeader>
            <CardTitle className="font-heading text-xl">
              🏟️ Active Sports & Competitions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(SPORTS).map(([category, leagues]) => (
                <div key={category}>
                  <h3 className="font-heading text-lg mb-2">{category}</h3>
                  <div className="space-y-2">
                    {leagues.map((league) => (
                      <div
                        key={league.slug}
                        className="flex items-center gap-2"
                      >
                        <Switch
                          checked={activeSports.includes(league.slug)}
                          onCheckedChange={() => toggleSport(league.slug)}
                        />
                        <span className="text-sm">{league.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Save & Save Results Toggle */}
        <div className="flex items-center justify-between mt-8">
          <div className="flex items-center gap-2">
            <Switch checked={saveResults} onCheckedChange={setSaveResults} />
            <span className="text-sm">Auto-save results</span>
          </div>
          <Button onClick={handleSave} className="gap-2">
            {saved ? (
              <Check className="h-4 w-4" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {saved ? "Saved!" : "Save Settings"}
          </Button>
        </div>
      </main>
    </div>
  );
}

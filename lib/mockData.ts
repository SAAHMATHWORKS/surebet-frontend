export interface Surebet {
  id: string;
  market: "h2h" | "btts" | "totals";
  home_team: string;
  away_team: string;
  competition: string;
  sport_label: string;
  commence_time: string;
  profit_percent: number;
  actual_profit: number;
  total_stake: number;
  stakes: {
    home?: number;
    draw?: number;
    away?: number;
    outcome1?: number;
    outcome2?: number;
  };
  best_odds: {
    home?: { odds: number; bookmaker: string };
    draw?: { odds: number; bookmaker: string };
    away?: { odds: number; bookmaker: string };
    yes?: { odds: number; bookmaker: string };
    no?: { odds: number; bookmaker: string };
    over?: { odds: number; bookmaker: string };
    under?: { odds: number; bookmaker: string };
    threshold?: number;
  };
}

export const mockSurebets: Surebet[] = [
  // ==================== H2H ====================
  {
    id: "1",
    market: "h2h",
    home_team: "Arsenal",
    away_team: "Chelsea",
    competition: "Premier League",
    sport_label: "Premier League (Angleterre)",
    commence_time: "2026-06-03T19:00:00Z",
    profit_percent: 1.87,
    actual_profit: 18.7,
    total_stake: 1000,
    stakes: { home: 480, draw: 0, away: 520 },
    best_odds: {
      home: { odds: 2.15, bookmaker: "Unibet" },
      draw: { odds: 0, bookmaker: "" },
      away: { odds: 2.2, bookmaker: "Betclic" },
    },
  },
  {
    id: "4",
    market: "h2h",
    home_team: "PSG",
    away_team: "Marseille",
    competition: "Ligue 1",
    sport_label: "Ligue 1 (France)",
    commence_time: "2026-06-06T20:45:00Z",
    profit_percent: 3.21,
    actual_profit: 32.1,
    total_stake: 1000,
    stakes: { home: 460, draw: 120, away: 420 },
    best_odds: {
      home: { odds: 2.5, bookmaker: "Winamax" },
      draw: { odds: 3.8, bookmaker: "PMU" },
      away: { odds: 3.0, bookmaker: "Unibet" },
    },
  },
  {
    id: "6",
    market: "h2h",
    home_team: "Bayern Munich",
    away_team: "Borussia Dortmund",
    competition: "Bundesliga",
    sport_label: "Bundesliga (Allemagne)",
    commence_time: "2026-06-05T17:30:00Z",
    profit_percent: 2.45,
    actual_profit: 24.5,
    total_stake: 1000,
    stakes: { home: 520, draw: 0, away: 480 },
    best_odds: {
      home: { odds: 2.05, bookmaker: "Bet365" },
      draw: { odds: 0, bookmaker: "" },
      away: { odds: 2.25, bookmaker: "Bwin" },
    },
  },
  {
    id: "7",
    market: "h2h",
    home_team: "Inter Milan",
    away_team: "AC Milan",
    competition: "Serie A",
    sport_label: "Serie A (Italie)",
    commence_time: "2026-06-08T19:45:00Z",
    profit_percent: 1.95,
    actual_profit: 19.5,
    total_stake: 1000,
    stakes: { home: 490, draw: 130, away: 380 },
    best_odds: {
      home: { odds: 2.3, bookmaker: "Pinnacle" },
      draw: { odds: 3.4, bookmaker: "William Hill" },
      away: { odds: 3.1, bookmaker: "1xBet" },
    },
  },
  {
    id: "8",
    market: "h2h",
    home_team: "Barcelona",
    away_team: "Atletico Madrid",
    competition: "La Liga",
    sport_label: "La Liga (Espagne)",
    commence_time: "2026-06-10T20:00:00Z",
    profit_percent: 0.98,
    actual_profit: 9.8,
    total_stake: 1000,
    stakes: { home: 510, draw: 0, away: 490 },
    best_odds: {
      home: { odds: 2.1, bookmaker: "Unibet" },
      draw: { odds: 0, bookmaker: "" },
      away: { odds: 2.0, bookmaker: "Winamax" },
    },
  },

  // ==================== BTTS ====================
  {
    id: "2",
    market: "btts",
    home_team: "Real Madrid",
    away_team: "Barcelona",
    competition: "La Liga",
    sport_label: "La Liga (Espagne)",
    commence_time: "2026-06-04T20:00:00Z",
    profit_percent: 2.12,
    actual_profit: 21.2,
    total_stake: 1000,
    stakes: { outcome1: 520, outcome2: 480 },
    best_odds: {
      yes: { odds: 2.05, bookmaker: "Winamax" },
      no: { odds: 2.1, bookmaker: "Bet365" },
    },
  },
  {
    id: "5",
    market: "btts",
    home_team: "Manchester City",
    away_team: "Liverpool",
    competition: "Premier League",
    sport_label: "Premier League (Angleterre)",
    commence_time: "2026-06-07T16:00:00Z",
    profit_percent: 1.23,
    actual_profit: 12.3,
    total_stake: 1000,
    stakes: { outcome1: 530, outcome2: 470 },
    best_odds: {
      yes: { odds: 1.9, bookmaker: "Bet365" },
      no: { odds: 2.15, bookmaker: "Bwin" },
    },
  },
  {
    id: "9",
    market: "btts",
    home_team: "Juventus",
    away_team: "Napoli",
    competition: "Serie A",
    sport_label: "Serie A (Italie)",
    commence_time: "2026-06-09T17:00:00Z",
    profit_percent: 1.78,
    actual_profit: 17.8,
    total_stake: 1000,
    stakes: { outcome1: 540, outcome2: 460 },
    best_odds: {
      yes: { odds: 1.85, bookmaker: "PMU" },
      no: { odds: 2.2, bookmaker: "Unibet" },
    },
  },
  {
    id: "10",
    market: "btts",
    home_team: "Ajax",
    away_team: "Feyenoord",
    competition: "Eredivisie",
    sport_label: "Eredivisie (Pays-Bas)",
    commence_time: "2026-06-06T14:30:00Z",
    profit_percent: 2.87,
    actual_profit: 28.7,
    total_stake: 1000,
    stakes: { outcome1: 490, outcome2: 510 },
    best_odds: {
      yes: { odds: 2.15, bookmaker: "Pinnacle" },
      no: { odds: 1.95, bookmaker: "Betclic" },
    },
  },

  // ==================== TOTALS ====================
  {
    id: "3",
    market: "totals",
    home_team: "LA Lakers",
    away_team: "Golden State Warriors",
    competition: "NBA",
    sport_label: "NBA (USA)",
    commence_time: "2026-06-05T02:00:00Z",
    profit_percent: 1.54,
    actual_profit: 15.4,
    total_stake: 1000,
    stakes: { outcome1: 510, outcome2: 490 },
    best_odds: {
      over: { odds: 1.95, bookmaker: "Pinnacle" },
      under: { odds: 2.1, bookmaker: "1xBet" },
      threshold: 220.5,
    },
  },
  {
    id: "11",
    market: "totals",
    home_team: "Boston Celtics",
    away_team: "Milwaukee Bucks",
    competition: "NBA",
    sport_label: "NBA (USA)",
    commence_time: "2026-06-06T00:30:00Z",
    profit_percent: 2.03,
    actual_profit: 20.3,
    total_stake: 1000,
    stakes: { outcome1: 480, outcome2: 520 },
    best_odds: {
      over: { odds: 2.05, bookmaker: "Bet365" },
      under: { odds: 2.0, bookmaker: "Winamax" },
      threshold: 215.5,
    },
  },
  {
    id: "12",
    market: "totals",
    home_team: "New York Yankees",
    away_team: "Boston Red Sox",
    competition: "MLB",
    sport_label: "MLB",
    commence_time: "2026-06-07T23:00:00Z",
    profit_percent: 1.12,
    actual_profit: 11.2,
    total_stake: 1000,
    stakes: { outcome1: 520, outcome2: 480 },
    best_odds: {
      over: { odds: 1.9, bookmaker: "Pinnacle" },
      under: { odds: 2.1, bookmaker: "1xBet" },
      threshold: 8.5,
    },
  },
  {
    id: "13",
    market: "totals",
    home_team: "Tampa Bay Lightning",
    away_team: "Colorado Avalanche",
    competition: "NHL",
    sport_label: "NHL",
    commence_time: "2026-06-08T01:00:00Z",
    profit_percent: 0.89,
    actual_profit: 8.9,
    total_stake: 1000,
    stakes: { outcome1: 505, outcome2: 495 },
    best_odds: {
      over: { odds: 2.0, bookmaker: "Unibet" },
      under: { odds: 1.95, bookmaker: "Bwin" },
      threshold: 5.5,
    },
  },

  // ==================== Plus de variété ====================
  {
    id: "14",
    market: "h2h",
    home_team: "Flamengo",
    away_team: "Palmeiras",
    competition: "Série A",
    sport_label: "Série A (Brésil)",
    commence_time: "2026-06-08T22:00:00Z",
    profit_percent: 4.1,
    actual_profit: 41.0,
    total_stake: 1000,
    stakes: { home: 430, draw: 140, away: 430 },
    best_odds: {
      home: { odds: 2.6, bookmaker: "Bet365" },
      draw: { odds: 3.2, bookmaker: "Betsson" },
      away: { odds: 2.8, bookmaker: "1xBet" },
    },
  },
  {
    id: "15",
    market: "btts",
    home_team: "Benfica",
    away_team: "Porto",
    competition: "Primeira Liga",
    sport_label: "Primeira Liga (Portugal)",
    commence_time: "2026-06-09T20:30:00Z",
    profit_percent: 3.45,
    actual_profit: 34.5,
    total_stake: 1000,
    stakes: { outcome1: 470, outcome2: 530 },
    best_odds: {
      yes: { odds: 2.25, bookmaker: "Pinnacle" },
      no: { odds: 1.85, bookmaker: "Winamax" },
    },
  },
  {
    id: "16",
    market: "totals",
    home_team: "Melbourne Storm",
    away_team: "Sydney Roosters",
    competition: "NRL",
    sport_label: "NRL (Australie)",
    commence_time: "2026-06-10T09:00:00Z",
    profit_percent: 2.55,
    actual_profit: 25.5,
    total_stake: 1000,
    stakes: { outcome1: 490, outcome2: 510 },
    best_odds: {
      over: { odds: 1.98, bookmaker: "Sportsbet" },
      under: { odds: 2.12, bookmaker: "TAB" },
      threshold: 38.5,
    },
  },
  {
    id: "17",
    market: "h2h",
    home_team: "Celtic",
    away_team: "Rangers",
    competition: "Scottish Premiership",
    sport_label: "Scottish Premiership",
    commence_time: "2026-06-11T12:00:00Z",
    profit_percent: 1.66,
    actual_profit: 16.6,
    total_stake: 1000,
    stakes: { home: 485, draw: 0, away: 515 },
    best_odds: {
      home: { odds: 2.1, bookmaker: "William Hill" },
      draw: { odds: 0, bookmaker: "" },
      away: { odds: 2.05, bookmaker: "Ladbrokes" },
    },
  },
];

export type LeaderboardEntry = {
  name: string;
  points: number;
  rank: number;
};

export type Match = {
  id: number;
  group: string;
  date: string;
  home: string;
  away: string;
  homeScore: number | null;
  awayScore: number | null;
  status: "finished" | "upcoming";
};

export type Prediction = {
  matchId: number;
  player: string;
  homeScore: number;
  awayScore: number;
  points: number;
};

export type TournamentPrediction = {
  player: string;
  winner: string;
  second: string;
  third: string;
  fourth: string;
  topScorer: string;
};

export type AppData = {
  leaderboard: LeaderboardEntry[];
  matches: Match[];
  predictions: Prediction[];
  tournamentPredictions: TournamentPrediction[];
};
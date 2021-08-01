/* Different points/stage that each and/or both player can have at a particular stage */
export type GamePoint = "0" | "15" | "30" | "40" | "ADVANTAGE" | "DEUCE" | "GAME";

/* Status of a particular game for each player */
export interface Game {
  player1: GamePoint;
  player2: GamePoint;
}

/* Status of a particular set at any particular stage */
export interface Set {
  player1: number;
  player2: number;
}

/* Scoreboard showing the status of the game and set(s)  */
export interface ScoreBoard {
  sets: Set;
  game: Game;
}

export type TieBreakGame = Set;

/* Constraint */
export type TotalSets = 1;
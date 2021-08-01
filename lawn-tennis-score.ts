/* Imports */
import {
  ScoreBoard,
  Game,
  Set,
  TieBreakGame,
  TotalSets
} from "./types";

/* Optimisation: I need to optimise the functions as I reliased now that I could have used ternary operator instead of if elses  */

/**
 * @global Player who scored the current point
 */
let playerWhoScored: string = "";

/**
 * @class Match
 * @author Sachin Kaw
 * @version 1.0
 */
export default class Match {
  /* Players */
  player1: string = "";
  player2: string = "";

  /**
   * @constructor Constructor with default-initialized parameters
   * @param player1 Player 1
   * @param player2 Player 2
   */
  constructor(player1 = "player 1", player2 = "player 2") {
    this.player1 = player1;
    this.player2 = player2;
  }

  /* Initial state of the Scoreboard */
  scoreBoard: ScoreBoard = {
    game: { player1: "0", player2: "0" },
    sets: { player1: 0, player2: 0 }
  };

  countGame = (
    game: Game = {
      player1: "0",
      player2: "0",
    }
  ): string => {
    let winner: string | undefined = undefined;
    /**
     * Checks if the player is having the "ADVANTAGE", revert the score to "40" if point lost
     * @param player Player 1 or 2
     */
    const playerAdvantageCheck = (player: string) => {
      if (player === this.player1) {
        if (game.player2 === "ADVANTAGE") {
          game.player2 = "40";
        }
      } else {
        if (game.player1 === "ADVANTAGE") {
          game.player1 = "40";
        }
      }
    };

    /**
     * This increments the player score
     * @param player Player 1 or 2
     * @param updateGame Game
     * @returns Game
     */
    const onPointScore = (player: string, updateGame: Game): Game => {
      const playerScore = player === this.player1 ? updateGame.player1 : updateGame.player2;

      switch (playerScore) {
        /* Point 0 */
        case "0":
          playerAdvantageCheck(player);
          if (player === this.player1) {
            updateGame.player1 = "15";
          } else {
            updateGame.player2 = "15";
          }
          console.log("game", game);
          return updateGame;
        /* Point 15 */
        case "15":
          playerAdvantageCheck(player);
          if (player === this.player1) {
            updateGame.player1 = "30";
          } else {
            updateGame.player2 = "30";
          }
          return updateGame;
        /* Point 30 */
        case "30":
          playerAdvantageCheck(player);
          if (player === this.player1) {
            updateGame.player1 = "40";
          } else {
            updateGame.player2 = "40";
          }
          break;
        /* Point 40 */
        case "40":
          playerAdvantageCheck(player);
          if (player === this.player1) {
            updateGame.player1 = "ADVANTAGE";
          } else {
            updateGame.player2 = "ADVANTAGE";
          }
          break;
        /* ADVANTAGE */
        case "ADVANTAGE":
          if (player === this.player1) {
            updateGame.player1 = "GAME";
          } else {
            updateGame.player2 = "GAME";
          }
      }
      return updateGame;
    }

    while (true) {
      if (game.player1 === "GAME") {
        winner = this.player1;
        break;
      } else if (game.player2 === "GAME") {
        winner = this.player2;
        break;
      }

      if (playerWhoScored === this.player1) {
        game = onPointScore(this.player1, game);
      } else {
        game = onPointScore(this.player2, game);
      }
    }
    return winner;
  }

  /**
   * Displaying the output - Scoreboard
   */
  score = (): void => {
    console.log(this.scoreBoard);
  }

  /**
   * For mainintaining the count of the set
   * @returns Set
   */
  setCount = (): Set => {
    const set: Set = {
      player1: 0,
      player2: 0,
    };
    this.countGame() === this.player1 ? set.player1++ : set.player2++;
    if (set.player1 === 6 && set.player2 === 6) {
      this.tieBreakGame() === this.player1 ? set.player1++ : set.player2++;
    }
    return set;
  }

  /**
   * Called when the player scores a point
   * @param player Player who scores the point, Player 1 or 2
   */

  pointWonBy = (player: string) => {

    let totalSets: TotalSets = 1;
    playerWhoScored = player;

    for (let i = 0; i < totalSets; i++) {
      const set = this.setCount();

      this.scoreBoard.sets.player1 = set.player1;
      this.scoreBoard.sets.player2 = set.player2;
    }
  };

  /**
   * The tie-break game continues until one player wins seven points by a margin of two or more points
   * @param scoreTarget Target Score
   * @param scores Score
   * @returns Player 1 or 2 or undefined
   */
  roundWinner = <T extends Set>(
    scoreTarget: number,
    scores: T
  ): string | undefined => {
    if (
      scores.player1 >= scoreTarget &&
      scores.player2 === scores.player1 - 2
    ) {
      return this.player1;
    } else if (
      scores.player2 >= scoreTarget &&
      scores.player1 === scores.player2 - 2
    ) {
      return this.player2;
    } else {
      return undefined;
    }
  };

  /**
   * Finds the winner of the Tie Break
   * @param game Game
   * @returns Tie Break Winner
   */
  tieBreakGame = (
    game: TieBreakGame = {
      player1: 0,
      player2: 0,
    }
  ): string => {
    let winner: string | undefined = undefined;

    while (true) {
      playerWhoScored === this.player1 ? game.player1++ : game.player2++;

      if (this.roundWinner(7, game) === this.player1) {
        winner = this.player1;
        break;
      } else if (this.roundWinner(7, game) === this.player2) {
        winner = this.player2;
        break;
      }
    }
    return winner;
  };
}

let match = new Match("player 1", "player 2");
match.pointWonBy("player 2");
match.score();
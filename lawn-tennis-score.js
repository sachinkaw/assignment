"use strict";
exports.__esModule = true;
/* Optimisation: I need to optimise the functions as I reliased now that I could have used ternary operator instead of if elses  */
/**
 * @global Player who scored the current point
 */
var playerWhoScored = "";
/**
 * @class Match
 * @author Sachin Kaw
 * @version 1.0
 */
var Match = /** @class */ (function () {
    /**
     * @constructor Constructor with default-initialized parameters
     * @param player1 Player 1
     * @param player2 Player 2
     */
    function Match(player1, player2) {
        var _this = this;
        if (player1 === void 0) { player1 = "player 1"; }
        if (player2 === void 0) { player2 = "player 2"; }
        /* Players */
        this.player1 = "";
        this.player2 = "";
        /* Initial state of the Scoreboard */
        this.scoreBoard = {
            game: { player1: "0", player2: "0" },
            sets: { player1: 0, player2: 0 }
        };
        this.countGame = function (game) {
            if (game === void 0) { game = {
                player1: "0",
                player2: "0"
            }; }
            var winner = undefined;
            /**
             * Checks if the player is having the "ADVANTAGE", revert the score to "40" if point lost
             * @param player Player 1 or 2
             */
            var playerAdvantageCheck = function (player) {
                if (player === _this.player1) {
                    if (game.player2 === "ADVANTAGE") {
                        game.player2 = "40";
                    }
                }
                else {
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
            var onPointScore = function (player, updateGame) {
                var playerScore = player === _this.player1 ? updateGame.player1 : updateGame.player2;
                switch (playerScore) {
                    /* Point 0 */
                    case "0":
                        playerAdvantageCheck(player);
                        if (player === _this.player1) {
                            updateGame.player1 = "15";
                        }
                        else {
                            updateGame.player2 = "15";
                        }
                        console.log("game", game);
                        return updateGame;
                    /* Point 15 */
                    case "15":
                        playerAdvantageCheck(player);
                        if (player === _this.player1) {
                            updateGame.player1 = "30";
                        }
                        else {
                            updateGame.player2 = "30";
                        }
                        return updateGame;
                    /* Point 30 */
                    case "30":
                        playerAdvantageCheck(player);
                        if (player === _this.player1) {
                            updateGame.player1 = "40";
                        }
                        else {
                            updateGame.player2 = "40";
                        }
                        break;
                    /* Point 40 */
                    case "40":
                        playerAdvantageCheck(player);
                        if (player === _this.player1) {
                            updateGame.player1 = "ADVANTAGE";
                        }
                        else {
                            updateGame.player2 = "ADVANTAGE";
                        }
                        break;
                    /* ADVANTAGE */
                    case "ADVANTAGE":
                        if (player === _this.player1) {
                            updateGame.player1 = "GAME";
                        }
                        else {
                            updateGame.player2 = "GAME";
                        }
                }
                return updateGame;
            };
            while (true) {
                if (game.player1 === "GAME") {
                    winner = _this.player1;
                    break;
                }
                else if (game.player2 === "GAME") {
                    winner = _this.player2;
                    break;
                }
                if (playerWhoScored === _this.player1) {
                    game = onPointScore(_this.player1, game);
                }
                else {
                    game = onPointScore(_this.player2, game);
                }
            }
            return winner;
        };
        /**
         * Displaying the output - Scoreboard
         */
        this.score = function () {
            console.log(_this.scoreBoard);
        };
        /**
         * For mainintaining the count of the set
         * @returns Set
         */
        this.setCount = function () {
            var set = {
                player1: 0,
                player2: 0
            };
            _this.countGame() === _this.player1 ? set.player1++ : set.player2++;
            if (set.player1 === 6 && set.player2 === 6) {
                _this.tieBreakGame() === _this.player1 ? set.player1++ : set.player2++;
            }
            return set;
        };
        /**
         * Called when the player scores a point
         * @param player Player who scores the point, Player 1 or 2
         */
        this.pointWonBy = function (player) {
            var totalSets = 1;
            playerWhoScored = player;
            for (var i = 0; i < totalSets; i++) {
                var set = _this.setCount();
                _this.scoreBoard.sets.player1 = set.player1;
                _this.scoreBoard.sets.player2 = set.player2;
            }
        };
        /**
         * The tie-break game continues until one player wins seven points by a margin of two or more points
         * @param scoreTarget Target Score
         * @param scores Score
         * @returns Player 1 or 2 or undefined
         */
        this.roundWinner = function (scoreTarget, scores) {
            if (scores.player1 >= scoreTarget &&
                scores.player2 === scores.player1 - 2) {
                return _this.player1;
            }
            else if (scores.player2 >= scoreTarget &&
                scores.player1 === scores.player2 - 2) {
                return _this.player2;
            }
            else {
                return undefined;
            }
        };
        /**
         * Finds the winner of the Tie Break
         * @param game Game
         * @returns Tie Break Winner
         */
        this.tieBreakGame = function (game) {
            if (game === void 0) { game = {
                player1: 0,
                player2: 0
            }; }
            var winner = undefined;
            while (true) {
                playerWhoScored === _this.player1 ? game.player1++ : game.player2++;
                if (_this.roundWinner(7, game) === _this.player1) {
                    winner = _this.player1;
                    break;
                }
                else if (_this.roundWinner(7, game) === _this.player2) {
                    winner = _this.player2;
                    break;
                }
            }
            return winner;
        };
        this.player1 = player1;
        this.player2 = player2;
    }
    return Match;
}());
exports["default"] = Match;
var match = new Match("player 1", "player 2");
match.pointWonBy("player 2");
match.score();

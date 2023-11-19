/*********************************************************************************
 * a typescript chess repertoire builder. including line and example game viewing
 * made for shcc: Saskatchewan Horizon Chess Club
 * Copyright (C) 2023 Nicolas Vaagen
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of  MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program.  If not, see <http://www.gnu.org/licenses/>.
 *********************************************************************************/
import { Chessground } from '../node_modules/chessground/dist/chessground.js';
import { Chess } from "./chess.js";
/**
 * a wrapper around Chessground and chess.js
 */
var BoardState = /** @class */ (function () {
    /**
     * create a new chessground chess board
     * @param boardRoot the root element to  put the board in
     */
    function BoardState(boardRoot) {
        this.config = { viewOnly: true };
        console.log("BoardTate Constructed.");
        this.boardRoot = boardRoot;
        this.board = Chessground(boardRoot, this.config);
        //chess.js record of what is on the board
        this.chess = new Chess();
        //get backBtn and forwardBtn from DOM
        this.backBtn = $("#boardCtrlBack");
        this.forwardBtn = $("#boardCtrlAhead");
        this.backBtn.on("click", { boardState: this }, function (event) {
            console.log("backBtn clicked");
            event.data.boardState.moveBack();
        });
        this.forwardBtn.on("click", { boardState: this }, function (event) {
            console.log("forwardBtn clicked");
            event.data.boardState.moveForward();
        });
    }
    /**
     * change the board position to given fen
     * @param fen the fen to change too
     */
    BoardState.prototype.switchFen = function (fen) {
        console.log(fen.stringFEN);
        this.board.set({ fen: fen.stringFEN });
        this.chess.load(fen.stringFEN);
        console.log(this.chess.ascii());
    };
    /**
     * change the orientation of the chessboard
     * @param boardSide can be "black" or "white"
     */
    BoardState.prototype.changeOrientation = function (boardSide) {
        if (boardSide == "white") {
            this.board.set({ orientation: "white" });
        }
        else if (boardSide == "black") {
            this.board.set({ orientation: "black" });
        }
        else {
            throw Error("boardSide must be black or white");
        }
    };
    /**
     * make a move
     * @param move a chess move in Algebraic Notation
     */
    BoardState.prototype.move = function (move) {
        var possibleMoves = this.chess.moves();
        if (!possibleMoves.includes(move)) {
            console.log("Move: " + move);
            console.log("possible moves: " + possibleMoves);
            throw new Error("Illegal move.");
        }
        //make the move on the visual, and virtual board
        var lastMove = this.chess.move(move);
        //move on the chessground
        this.board.move(lastMove.from, lastMove.to);
    };
    /**
     * undo last move
     */
    BoardState.prototype.moveBack = function () {
        console.log("moveBack entered.");
    };
    /**
     * move forward
     */
    BoardState.prototype.moveForward = function () {
        console.log("moveForward entered");
    };
    return BoardState;
}());
export { BoardState };
//# sourceMappingURL=board-state.mjs.map
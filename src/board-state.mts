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
import { FEN } from "./chess-notation.js";
import { Chess } from "./chess.js"

/**
 * a wrapper around Chessground and chess.js
 */
export class BoardState
{
  boardRoot:HTMLElement;
  private config = { viewOnly: true };
  private board;
  private chess: Chess;
  private backBtn: JQuery<HTMLElement>;

  /**
   * create a new chessground chess board
   * @param boardRoot the root element to  put the board in
   */
  constructor(boardRoot: HTMLElement)
  {

    console.log("BoardTate Constructed.")
    this.boardRoot = boardRoot;

    this.board = Chessground(boardRoot, this.config);

    //chess.js record of what is on the board
    this.chess = new Chess();

    //get back btn from DOM
    this.backBtn = $("#boardCtrlBac");

    this.backBtn.on("click", function ()
      {
        console.log("backBtn clicked");
      }
    );
  }

  /**
   * change the board position to given fen
   * @param fen the fen to change too
   */
  public switchFen(fen:FEN):void
  {
    console.log(fen.stringFEN)
    this.board.set({fen: fen.stringFEN});
    this.chess.load(fen.stringFEN);
    console.log(this.chess.ascii())
  }

  /**
   * change the orientation of the chessboard
   * @param boardSide can be "black" or "white"
   */
  public changeOrientation(boardSide:String):void
  {
    if(boardSide == "white"){
      this.board.set({orientation: "white"});
    }
    else if(boardSide == "black"){
      this.board.set({orientation: "black"});
    }
    else{
      throw Error("boardSide must be black or white");
    }
  }

  /**
   * undo last move
   */
  public undoMove()
  {

  }
}
/* a typescript chess repertoire builder. including line and example game viewing made for shcc
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
 */

import { Chessground } from "../node_modules/chessground/dist/chessground.js";
import { FEN } from "../node_modules/chessground/dist/types.js";

/**
 * a wrapper around Chessground
 */
export class BoardState {

  boardRoot:HTMLElement;
  private config = { viewOnly: true };
  private board;

  /**
   * create a new chessground chess board
   * @param boardRoot the root element to  put the board in
   */
  constructor(boardRoot: HTMLElement){

    this.boardRoot = boardRoot;

    this.board = Chessground(boardRoot, this.config);
  }

  /**
   * change the board position to given fen
   * @param fen the fen to change too
   */
  public switchFen(fen:FEN) {

    console.log(fen.stringFEN)
    this.board.set({fen: fen.stringFEN});
  }

  /**
   * change the orientation of the chessboard
   * @param boardSide can be "black" or "white"
   */
  public changeOrientation(boardSide:String) {

    if(boardSide = "white"){
      this.board.set({orientation: "white"});
    }
    else if(boardSide = "black"){
      this.board.set({orientation: "black"});
    }
    else{
      throw Error("boardSide must be black or white");
    }
  }
}
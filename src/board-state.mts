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

/*global $ */ //for eslint
//import { FEN } from "./chess-notation.mjs";

import { PGN } from "./chess-notation.mjs"


/**
 * a wrapper around Chessground and chess.js
 */
export class BoardState
{
  boardRoot:HTMLElement;
  config = {
    viewOnly: true,
    pgn: `[Event "Rated Blitz game"]
    [Site "https://lichess.org/IMxmoURQ"]
    [Date "2023.11.20"]
    [White "nrv773"]
    [Black "Aboodi916"]
    [Result "0-1"]
    [UTCDate "2023.11.20"]
    [UTCTime "04:28:11"]
    [Variant "Standard"]
    [TimeControl "180+2"]
    [ECO "A20"]
    [Opening "English Opening: King's English Variation"]
    [Termination "Normal"]
    [Annotator "lichess.org"]

    1. c4 e5 { A20 English Opening: King's English Variation } 2. g3 Bc5 3. Nc3 Nc6 4. Bg2 d6 5. a3 a6 6. b4 Ba7 7. e3 Rb8 8. Nge2 Bg4 9. O-O Qd7 10. d4 exd4 11. exd4 Nxd4 12. c5 Nxe2+ 13. Nxe2 Nf6 14. Re1 O-O 15. Qc2 dxc5 16. bxc5 Bh3 17. Rd1 Qc8 18. Bf3 b6 19. c6 b5 20. Rb1 Qe6 21. Nf4 Qc8 22. Nxh3 Qxh3 23. Bf4 Bb6 24. Rb4 Ng4 25. Bxg4 Qxg4 26. Bxc7 Qf5 27. Bxb8 Rxb8 28. c7 Rc8 29. Rd8+ Rxd8 30. cxd8=Q+ Bxd8 31. a4 Qxc2 { White resigns. } 0-1`};


  /**
   * create a new chessground chess board
   * @param boardRoot the root element to  put the board in
   */
  constructor(boardRoot: HTMLElement)
  {

    console.log("BoardState Constructed. this.PgnViewer = start(boardRoot, this.config);");
    this.boardRoot = boardRoot;
    console.log("board root: " + this.boardRoot);

  }

  /**
   * change the orientation of the chessboard
   * @param boardSide can be "black" or "white"
   */
  public changeOrientation(boardSide:string):void
  {
    if(boardSide == "white")
    {
      this.board.set({orientation: "white"});
    }
    else if(boardSide == "black")
    {
      this.board.set({orientation: "black"});
    }
    else{
      throw Error("boardSide must be black or white");
    }
  }

  /**
   * make a move
   * @param move a chess move in Algebraic Notation
   */
  public move(move:string):void
  {
    let possibleMoves = this.chess.moves();

    if(!possibleMoves.includes(move))
    {
      console.log("Move: " + move);
      console.log("possible moves: " + possibleMoves);
      throw new Error("Illegal move.");
    }

    //make the move on the visual, and virtual board
   let lastMove:Move = this.chess.move(move);

   //move on the chessground
   this.board.move(lastMove.from, lastMove.to)
  }

  /**
   * change the pgn on the board
   * @param pgn the pgn to switch to
   */
  public moveBack()
  {
    console.log("setPGN entered with pgn: " + pgn.stringPgn);
    //todo make this work.
    $( "#chessground" ).html('<iframe id="chessground" class="chessground" width="800px" height="800px" src="https://lichess.org/study/embed/PYEVM2pA/IxM8A4cP#60" frameborder=0></iframe>');
  }
}
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
import { FEN } from "./chess-notation.mjs";
import { Chess, Move } from "./chess.js"

import LichessPgnViewer from './lichess-pgn-viewer.js';
import Chessground  from "./lichess-pgn-viewer.js"


/**
 * a wrapper around Chessground and chess.js
 */
export class BoardState
{
  boardRoot:HTMLElement;
  private config = {
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
  private chess: Chess;
  private backBtn: JQuery<HTMLElement>;
  private forwardBtn: JQuery<HTMLElement>;
  private PgnViewer;

  /**
   * create a new chessground chess board
   * @param boardRoot the root element to  put the board in
   */
  constructor(boardRoot: HTMLElement)
  {

    console.log("BoardTate Constructed.")
    this.boardRoot = boardRoot;

    this.PgnViewer = LichessPgnViewer(boardRoot, this.config);
    //this.board = Chessground(boardRoot, this.config);
    //this.PgnViewer.withGround(this.board);
    console.log(this.PgnViewer);

    //chess.js record of what is on the board
    this.chess = new Chess();

    //get backBtn and forwardBtn from DOM
    this.backBtn = $( "#boardCtrlBack" );
    this.forwardBtn = $( "#boardCtrlAhead" );


    this.backBtn.on("click", { boardState:this }, function (event)
      {
        console.log("backBtn clicked");
        event.data.boardState.moveBack();
      }
    );

    this.forwardBtn.on("click", { boardState:this }, function (event)
      {
        console.log("forwardBtn clicked");
        event.data.boardState.moveForward();
      });
  }

  /**
   * change the board position to given fen
   * @param fen the fen to change too
   */
  public switchFen(fen:FEN):void
  {
    console.log(fen.stringFEN)
    this.PgnViewer.togglePgn()
    this.chess.load(fen.stringFEN);
    console.log(this.chess.ascii())
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
    const possibleMoves = this.chess.moves();

    if(!possibleMoves.includes(move))
    {
      console.log("Move: " + move);
      console.log("possible moves: " + possibleMoves);
      throw new Error("Illegal move.");
    }

    //make the move on the visual, and virtual board
   const lastMove:Move = this.chess.move(move);

   //move on the chessground
   this.board.move(lastMove.from, lastMove.to)
  }

  /**
   * undo last move
   */
  public moveBack()
  {
    console.log("moveBack entered. 8======D");

    const pgn:string =
    `[Event "F/S Return Match"]
    [Site "Belgrade, Serbia JUG"]
    [Date "1992.11.04"]
    [Round "29"]
    [White "Fischer, Robert J."]
    [Black "Spassky, Boris V."]
    [Result "1/2-1/2"]

    1. e4 e5 2. Nf3 Nc6 3. Bb5 {This opening is called the Ruy Lopez.} 3... a6
    4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O 9. h3 Nb8 10. d4 Nbd7
    11. c4 c6 12. cxb5 axb5 13. Nc3 Bb7 14. Bg5 b4 15. Nb1 h6 16. Bh4 c5 17. dxe5
    Nxe4 18. Bxe7 Qxe7 19. exd6 Qf6 20. Nbd2 Nxd6 21. Nc4 Nxc4 22. Bxc4 Nb6
    23. Ne5 Rae8 24. Bxf7+ Rxf7 25. Nxf7 Rxe1+ 26. Qxe1 Kxf7 27. Qe3 Qg5 28. Qxg5
    hxg5 29. b3 Ke6 30. a3 Kd6 31. axb4 cxb4 32. Ra5 Nd5 33. f3 Bc8 34. Kf2 Bf5
    35. Ra7 g6 36. Ra6+ Kc5 37. Ke1 Nf4 38. g3 Nxh3 39. Kd2 Kb5 40. Rd6 Kc5 41. Ra6
    Nf2 42. g4 Bd3 43. Re6 1/2-1/2
    `;

    console.log(pgn);

    //test pgn reading
    console.log("testing PgnParser");
    console.log(PgnParser(pgn));
  }

  /**
   * move forward
   */
  public moveForward()
  {
    console.log("moveForward entered");
  }
}

/*
this will be my implementation of a pgn parser
a large portion was copied from lichess
*/



/**
 * for parsing pgn
 */
function PgnParser(pgn:string)
{

 console.log(pgn);

}


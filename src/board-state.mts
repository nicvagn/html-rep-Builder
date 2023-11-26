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
import LichessPgnViewer from './pgnViewer/main.js';


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
    console.log("board root: "+ this.boardRoot);

    LichessPgnViewer(boardRoot, this.config);
  }

  /**
   * change the orientation of the chessboard
   * @param boardSide can be "black" or "white"
   */
  public changeOrientation(boardSide:string):void
  {
    console.log(boardSide)
  }
  cfg = {
    viewOnly: true,
    pgn: `[Event "Rated Rapid game"]
  [Site "https://lichess.org/eOXqcPAS"]
  [Date "2023.11.20"]
  [White "Integralis"]
  [Black "nrv773"]
  [Result "0-1"]
  [UTCDate "2023.11.20"]
  [UTCTime "20:48:54"]
  [Variant "Standard"]
  [TimeControl "900+10"]
  [ECO "B10"]
  [Opening "Caro-Kann Defense: Two Knights Attack"]
  [Termination "Normal"]
  [Annotator "lichess.org"]

  1. e4 c6 2. Nf3 d5 3. Nc3 { B10 Caro-Kann Defense: Two Knights Attack } d4?! { (0.28 → 0.96) Inaccuracy. Bg4 was best. } (3... Bg4 4. h3 Bxf3 5. Qxf3 e6 6. Be2 Bc5 7. O-O Nd7 8. exd5) 4. Ne2 c5 5. c3 Nc6?! { (0.94 → 1.76) Inaccuracy. dxc3 was best. } (5... dxc3 6. Nxc3 a6 7. d4 cxd4 8. Qxd4 Qxd4 9. Nxd4 e6 10. Be3) 6. cxd4 cxd4 7. Ng3?? { (1.49 → -0.27) Blunder. Qa4 was best. } (7. Qa4 a6 8. Nexd4 Bd7 9. d3 Nf6 10. Nxc6 Bxc6 11. Qb3 e5) 7... e5 8. Bb5 Bd6 9. Qa4?! { (0.17 → -0.81) Inaccuracy. O-O was best. } (9. O-O a6 10. Ba4 b5 11. Bc2 Nf6 12. d3 O-O 13. Bd2 Bd7 14. a3 a5 15. Bb3 a4) 9... Ne7 10. d3 O-O 11. O-O a6 12. Bxc6 Nxc6 13. Nf5 b5?! { (-1.30 → -0.41) Inaccuracy. Bxf5 was best. } (13... Bxf5) 14. Qb3 Be6 15. Qd1 Bc7?! { (-0.36 → 0.28) Inaccuracy. Be7 was best. } (15... Be7) 16. a3?! { (0.28 → -0.76) Inaccuracy. Ng5 was best. } (16. Ng5 Qf6) 16... b4?! { (-0.76 → 0.19) Inaccuracy. f6 was best. } (16... f6) 17. Qc2?! { (0.19 → -0.58) Inaccuracy. Ng5 was best. } (17. Ng5 Qd7) 17... Ne7 18. Nxe7+ Qxe7 19. axb4 Rfc8 20. Qd2 Rcb8 21. Qe1?! { (-0.59 → -1.27) Inaccuracy. Qc2 was best. } (21. Qc2 Rxb4) 21... Qxb4 22. Bd2 Qxb2 23. Ba5 Bd6 24. Qc1?! { (-1.71 → -2.39) Inaccuracy. Ng5 was best. } (24. Ng5 Ba2 25. f4 exf4 26. Rf2 Qxa1 27. Qxa1 Rb1+ 28. Rf1 Rxa1 29. Rxa1 h6 30. e5 Be7) 24... Qxc1 25. Rfxc1 h6? { (-1.79 → -0.12) Mistake. Rc8 was best. } (25... Rc8 26. Nd2 h5 27. Kf1 Rab8 28. Rxc8+ Rxc8 29. Ke2 f6 30. Kd1 h4 31. h3 Rb8 32. Rc1) 26. Rc6 Bf8 27. Nxe5 Rb5 28. Bc7? { (0.00 → -1.15) Mistake. Nf3 was best. } (28. Nf3 Bc5 29. Kf1 Bd7 30. Rc7 Be6 31. Rc6) 28... a5 29. Nf3 a4?! { (-1.41 → -0.42) Inaccuracy. Rb4 was best. } (29... Rb4 30. Be5 Bd7 31. Rcc1 Bg4 32. Rab1 Rxb1 33. Rxb1 a4 34. h3 Bxf3 35. gxf3 Rd8 36. Bc7) 30. Nxd4 Rb4?! { (-0.70 → 0.10) Inaccuracy. Bd7 was best. } (30... Bd7) 31. Nxe6 fxe6 32. h3 a3 33. Rc3?? { (-0.11 → -1.93) Blunder. Be5 was best. } (33. Be5 Rb3) 33... a2 34. Rcc1 Rb2? { (-1.90 → -0.72) Mistake. Rc8 was best. } (34... Rc8 35. Rxa2) 35. Be5 Rd2 36. Kf1 Ba3 37. Rd1 Rc2?! { (-1.34 → -0.67) Inaccuracy. Rxd1+ was best. } (37... Rxd1+ 38. Rxd1) 38. Ke1?? { (-0.67 → -3.30) Blunder. Re1 was best. } (38. Re1) 38... Bb2?? { (-3.30 → 0.00) Blunder. Rf8 was best. } (38... Rf8 39. f4 g5 40. Kf1 gxf4 41. d4 f3 42. g4 Rfc8 43. d5 exd5 44. exd5 Bc5 45. d6) 39. Bxb2 Rxb2 40. Rdc1?? { (0.00 → -4.40) Blunder. Rd2 was best. } (40. Rd2 Rb1+ 41. Rd1 Rb2) 40... Kh7 41. g4?! { (-4.40 → -6.06) Inaccuracy. g3 was best. } (41. g3 Rf8 42. f4 Rfb8 43. Kf1 Rb1 44. Kf2 Rxc1 45. Rxc1 Rb1 46. Rxb1 axb1=R 47. h4 g5) 41... Kg6?! { (-6.06 → -4.42) Inaccuracy. Rf8 was best. } (41... Rf8 42. Kf1 Rfxf2+ 43. Kg1 Rg2+ 44. Kh1 Rg3 45. Rd1 Rxh3+ 46. Kg1 Rg3+ 47. Kh1 Rxg4 48. Re1) 42. f4 Kf6 43. Kd1 Rab8 44. Rc2 Rb1+ 45. Rc1 Rxa1 46. Rxa1 Rb1+ 47. Kc2 Rxa1 48. Kb2 Rh1 49. Kxa2 Rxh3 50. d4 Re3 51. d5?! { (-7.27 → -40.75) Inaccuracy. e5+ was best. } (51. e5+ Kf7 52. g5 hxg5 53. fxg5 Rxe5 54. dxe5 Kg6 55. Kb2 Kxg5 56. Kc2 Kf5 57. Kd3 Kxe5) 51... Rxe4 52. d6 Rxf4 53. d7 Rd4 54. d8=Q+ Rxd8 55. g5+ Kxg5 56. Kb3 e5 57. Kb4 e4 58. Kb5 e3 59. Kb6 e2 60. Kc7 Rd1 61. Kc6 e1=Q 62. Kb7 Qc3 63. Kb6 Rb1+ 64. Ka7 Qa3# { Black wins by checkmate. } 0-1`};

  /**
   * change the pgn on the board
   * @param pgn the pgn to switch to
   */
  public setPGN(pgn:PGN): void
  {
    console.log("setPGN entered with pgn: " + pgn.stringPgn);
    //todo make this work.
  }
}
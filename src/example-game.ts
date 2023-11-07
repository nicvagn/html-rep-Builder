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

import { PGN } from "./chess-notation.js";
import { FEN } from "./chess-notation.js";

/**
 * a chess repertoire example game. It's primary use is in a rep builder GUI, so it needs to have a visual
 * component :. extends button
 */
export class ExampleGame {

  public name: string; //game name
  public PGN: PGN;  //example game pgn
  public FEN: FEN = new FEN("rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2 ");

  /**
   * construct a new repertoire game
   * @param {string} name the name of the line
   * @param {PGN} pgn the pgn of the game
   */
  constructor(name:string, pgn:PGN){

    this.name = name;
    this.PGN = pgn;
  }

}
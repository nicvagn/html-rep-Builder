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

//import { event } from "jquery";
import { PGN } from "./chess-notation.mjs";
import { FEN } from "./chess-notation.mjs";
import { controller } from "./index.js";

/**
 * a chess repertoire example game. It's primary use is in a rep builder GUI, so it needs to have a visual
 * component :. extends button
 */
export class ExampleGame
{

  public name: string; //game name
  public PGN: PGN;  //example game pgn
  public FEN: FEN;

  public gameBtn: JQuery<HTMLElement>;

  /**
   * construct a new repertoire game
   * @param {string} name the name of the game
   * @param {PGN} pgn the pgn of the game
   */
  constructor(name: string, pgn: PGN, fen:FEN)
  {
    console.log("Example Game constructed.")
    this.name = name;
    this.PGN = pgn;
    this.FEN = fen;

    //create the visual button for the gui
    this.gameBtn =
    $('<button/>', {
      text: this.name, //set text 1 to 10
      id: name,
    });

    //create the visual rep of the game on construction
    this.gameBtn.addClass("repGame");

    this.gameBtn.on("click", {game:this}, function (event)
    {
      event.data.game.showGame(event.data.game);
    });
  }

  /**
   * change the main board to display this game
   * @param game the ExampleGame to show
   */
  public showGame(game:ExampleGame)
  {
    controller.changeExampleGame(game.FEN);
  }
}
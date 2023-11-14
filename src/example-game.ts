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
import { PGN } from "./chess-notation.js";
import { FEN } from "./chess-notation.js";
import { controller  } from "./repertoire-controller.mjs";

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
   * @param {string} name the name of the line
   * @param {PGN} pgn the pgn of the game
   * @param {number} index of this game for getting from the controller
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
      text: name, //set text 1 to 10
      id: name,
    });

    //create the visual rep of the game on construction
    $(this.gameBtn).addClass("repGame");

    $(this.gameBtn).on("click", this.FEN, this.showGame);
  }

  /**
   * pass game on to controller to display
   * @param event event that triggered this function call
   */
  private showGame(event:any)
  {
    console.log("showGame() entered.");
    console.log("EVENT: " + event)
    console.log("EVENT FEN: " + event.data.FEN);
    controller.changeExampleGame(event.data);
  }
}
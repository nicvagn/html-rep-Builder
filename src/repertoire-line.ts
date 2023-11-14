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


import { ExampleGame } from "./example-game.js";
import { PGN } from "./chess-notation.js"
import { controller } from "./repertoire-controller.mjs";

/**
 * a chess repertoire line. It's primary use is in a rep builder GUI, so it needs to have a visual
 * component
 */
export class RepertoireLine
{
  name: string;
  pgn?: PGN; //main pgn of the line
  exampleGames: Array<ExampleGame> = []; //example games for th current line

  //line sutton for display on the DOM
  public lineBtn: JQuery<HTMLElement>;

  /**
   * construct a new repertoire line
   * @param {string} name the name of the line
   */
  constructor(name: string, exampleGames?: ExampleGame[])
  {

    this.name = name;

    //create the visual button for the gui
    this.lineBtn =
    $('<button/>', {
      text: name,
      id: name,
    });

    //create the visual rep of the game on construction
    $(this.lineBtn).addClass("repLine");

    $(this.lineBtn).on("click", this.exampleGames, this.setOpenLine);

    if (exampleGames != undefined) {
      //if there is a value for exampleGames
      this.exampleGames = exampleGames;
    }
  }

  /**
   * reset the gameList to empty
   */
  public resetGames():void
  {
    if (this.exampleGames.length == 0) {
      return; // if game list is already empty
    }
    if (confirm("reset games?")) {
      //confirm reset games
      //make the example games list empty again
      this.exampleGames = [];
    }
  }

  /**
   * create a game and add it to this repertoire object
   * @param {string} gameName the name to give to this game
   * @param {PGN} pgn pgn of the game
   */
  public addGame(game: ExampleGame):void
  {
    //add the game to our list
    this.exampleGames.push(game);

  }

  /**
   * set this as the open line
   */
  private setOpenLine():void
  {
    controller.setOpenLine(this);
  }
}
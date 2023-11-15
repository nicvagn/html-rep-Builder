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
import { Repertoire } from "./repertoire.js";

/**
 * a chess repertoire line. It's primary use is in a rep builder GUI, so it needs to have a visual
 * component
 */
export class RepertoireLine {
  name: string;
  inRep: Repertoire; //the rep this line is in
  pgn?: PGN; //main pgn of the line

  exampleGames: ExampleGame[] = new Array<ExampleGame>(); //example games for th current line

  //line sutton for display on the DOM
  public lineBtn: JQuery<HTMLElement>;

  /**
   * construct a new repertoire line
   * @param {string} name the name of the line
   * @param rep the repertoire that contains this line
   */
  constructor(name: string, rep:Repertoire, exampleGames?: ExampleGame[])
  {
    console.log("repertoire line with name: " + name + " constructed.")
    this.name = name;
    this.inRep = rep;

    //create the visual button for the gui
    this.lineBtn = $("<button/>", {
      text: name,
      id: name,
      line:this
    });

    //create the visual rep of the game on construction
    this.lineBtn.addClass("repLine");

    if (exampleGames != undefined) {
      //if there is a value for exampleGames
      this.exampleGames = exampleGames;
    }
  }

  /**
   * reset the gameList to empty
   */
  public resetGames(): void {
    if (this.exampleGames.length == 0) {
      return; // if game list is already empty
    }
    if (confirm("reset games?")) {
      //confirm reset games
      //make the example games list empty again
      this.exampleGames = new Array<ExampleGame>();
    }
  }

  /**
   * add an example game to this line
   * @param game ExampleGame to add
   */
  public addGame(game: ExampleGame): void
  {
    //add the game to our list
    this.exampleGames.push(game);
  }

  /**
   * get the example games for this line
   * @returns this lines example games
   */
  public getGames():ExampleGame[]
  {
    return this.exampleGames;
  }

  /**
   * set this line as te open line for a repertoire
   */
  public setAsOpenLine():void
  {
    console.log("setAsOpenLineEntered");
    this.inRep.setOpenLine(this);
  }

  /**
   * display array gameList in html page
   */
  public updateGameDisplay(): void
  {
    console.log("updateGameDisplay() entered");

    console.log("=======================================");

    //empty the doc game list
    $("#gameList").replaceWith("<div id='gameList'> <h1>hi</h1> </div>");

    console.log("example Games List length: " + this.exampleGames.length);


    this.exampleGames.forEach((game) =>
    {
      console.log("game added to gameList: " + game.name);
      game.gameBtn.appendTo($( '#gameList' ));

      game.gameBtn.on("click", { game:game }, function (event)
      {
        console.log("game clicked with name: " + game.name);
        event.target;
      });
    });
  }
}
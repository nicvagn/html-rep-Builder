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

//nrv stuff
import { ExampleGame } from "./example-game.js";
import { controller } from "./index.js";

interface lineJSON
{
  name: string;
  studyURL: string;
  exampleGames: ExampleGame[];
}

/**
 * a chess repertoire line. It's primary use is in a rep builder GUI, so it needs to have a visual
 * component
 */
export class RepertoireLine
{
  name: string;
  studyURL: string;

  exampleGames: ExampleGame[] = new Array<ExampleGame>(); //example games for th current line


  //line sutton for display on the DOM
  public lineBtn!: JQuery<HTMLElement>;

  /**
   * construct a new repertoire line
   * @param name the name of the line
   * @param pgn the pgn of this line
   * @param exampleGames any example games of this line in action
   */
  constructor(name: string, studyURL: string, exampleGames?: ExampleGame[])
  {
    console.log("repertoire line with name: " + name + " + studyURL: " + studyURL + " constructed.")
    this.name = name;
    this.studyURL = studyURL;

    this.createLineButton();

    if (exampleGames != undefined) {
      //if there is a value for exampleGames
      this.exampleGames = exampleGames;
    }
  }

  private createLineButton(): void
  {
    //create the visual button for the gui
    this.lineBtn = $("<button/>", {
      text: this.name,
      id: this.name,
      line:this
    });
    this.lineBtn.addClass("repLine");
  }

  /**
   * convert this line to JSON
   */
  public toJSON(): lineJSON
  {
    // toJSON is automatically used by JSON.stringify
    const lineJSON = Object.assign({}, this, {
      lineBtn: null,  //do not worry about saving the line btn, it can be built again
    });

    return lineJSON;
  }

  /**
   * convert a line line from JSON to object
   */
  static fromJSON(json: lineJSON )
  {
    if(json.exampleGames != undefined)
    {
      return new RepertoireLine(json.name, json.studyURL, json.exampleGames);
    }
    else
    {
      return new RepertoireLine(json.name, json.studyURL)
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

    console.log("this =" + this.name + "this.exampleGames = " + this.exampleGames);
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
   * open this line
   */
  public open(): void
  {
   //update name display
   controller.setNameElement(this.name);

   console.log("================ line opened =====================");

   controller.changeStudy(this); //change the main board to this study

   this.refreshGameDisplay(); //refresh the game display to be current
  }

  /**
   * refresh array gameList in html page
   */
  public refreshGameDisplay(): void
  {
    console.log("refreshGameDisplay() entered");

    //empty the doc game list
    $("#gameList").replaceWith("<div id='gameList'> </div>");

    console.log("example Games List length: " + this.exampleGames.length);
    console.log("example game list: " + this.exampleGames)

    this.exampleGames.forEach((game) =>
    {
      console.log(game);
      console.log("game added to gameList: " + game.name);
      game.gameBtn.appendTo($( '#gameList' ));

      game.gameBtn.on("click", { game:game }, function (event)
        {
          console.log("game clicked with name: " + game.name);
          event.data.game.showGame(game);
        });
    });
  }
}
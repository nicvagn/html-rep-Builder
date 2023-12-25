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
import { checkDeleteMode } from "./index.js";
import { EditRepertoireController } from "./edit-repertoire-controller.mjs";
import { Controller } from "./repertoire-controller.mjs";
import { lineJSON, loadGame } from "./save-control.js";
/**
 * a chess repertoire line. It's primary use is in a rep builder GUI, so it needs to have a visual
 * component.
 *
 * the lineBtn is this visual component
 **/
export class RepertoireLine
{
  name: string;
  line: ExampleGame; //what is a line, if not a game?
  exampleGames = new Array<ExampleGame>();
  studyURL: string;


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

    if (exampleGames != undefined) {
      //if there is a value for exampleGames
      this.exampleGames = exampleGames;
    }

    //set up internal representation of line
    this.line = new ExampleGame(name, studyURL);

    //create the line btn
    this.createLineButton();
  }


  /**
   * create the Line Button on the DOM
   */
  public createLineButton(): void
  {
    //create the visual button for the gui
    this.lineBtn = $("<button/>", {
      text: this.name,
      id: this.name,
      line:this
    });
    this.lineBtn.addClass("repLine delete-mode");
  }

  /**
   * get the keys(names) for the games of this line. The keys being what they are stored under in LS
   * @returns string[] of the game keys for LS fetching
   */
  private getGameKeys(): string[]
  {
    const keys = new Array<string>();
    for(let x = 0; x < this.exampleGames.length; x++)
    {
      keys.push(this.exampleGames[x].name)
    }
    return keys;
  }

  /**
   * convert this line to JSON
   */
  public toJSON(): lineJSON
  {
    // toJSON is automatically used by JSON.stringify
    const lineJSON = {
      name_key: this.name,
      type: 'line',
      studyURL: this.studyURL,
      exampleGameKeys: this.getGameKeys(),
    }

    return lineJSON;
  }

  /**
   * convert a line line from JSON to object
   */
  public static fromJSON(json: lineJSON ): RepertoireLine
  {
    console.log("REPERTOIRE LINE from json entered, with lineJSON" + JSON.stringify(json));

    const line = new RepertoireLine(json.name_key, json.studyURL);

    if(json.exampleGameKeys != undefined)
    {
      console.log("json.name: " + json.name_key + " json.studyURL: " + json.studyURL);

      //retrieve all the EX games from the keys we where given
      for(let x = 0; x < json.exampleGameKeys.length; x++)
      {
        //load games from their keys, and add them to the line
        const key = json.exampleGameKeys[x];
        const exGame = loadGame(key);
        line.addGame(exGame);
      }
    }

    return line;
  }


  /**
   * add an example game to this line
   * @param game ExampleGame to add
   */
  public addGame(game: ExampleGame): void
  {
    //add the game to our list
    this.exampleGames.push(game);

    console.log("this = " + this.name + " this.exampleGames = " + this.exampleGames.toString);
  }

  /**
   * get the example games for this line
   * @returns this lines example games
   */
  public getGames(): ExampleGame[]
  {
    return this.exampleGames;
  }

  /**
   * set this lines example games
   * @param newGames the new array of example games
   */
  public setGames(newGames: ExampleGame[]): void
  {
    this.exampleGames = newGames;
    this.refreshGameDisplay();
  }
  /**
   * delete a game from this line
   * @param game game to be deleted
   */
  public deleteGame(game: ExampleGame): void
  {
    //make a new example game list with that game removed
    const newGames = new Array<ExampleGame>();

    this.exampleGames.forEach(exGame =>
      {
        if( game.studyURL != exGame.studyURL )
        {
          newGames.push(exGame);
        }
        else
        {
          console.log(exGame + " Deleted")
        }
      });

      //update example games
      this.exampleGames = newGames;

      //refresh game display
      this.refreshGameDisplay();
  }

  /**
   * open this line, or delete it if delete mode is on
   */
  public select(): void
  {
    if( checkDeleteMode() )
    {
      //delete this line
      EditRepertoireController.delete(this);
      return;
    }
    //update name display
    Controller.setNameElement(this.name);

    console.log("================ line opened =====================");

    //change the study
    Controller.changeStudy(this);

    this.refreshGameDisplay(); //refresh the game display to be current
  }

  /**
   * refresh array gameList in html page
   */
  public refreshGameDisplay(): void
  {
    console.log("refreshGameDisplay() entered");

    //empty the doc game list
    $( "#gameList" ).replaceWith( "<div id='gameList'> </div>" );

    console.log("example Games List length: " + this.exampleGames.length);
    console.log("example game list: " + this.exampleGames)

    //for each example game add it to the game list and add a listener
    this.exampleGames.forEach((game) =>
    {
      game.createGameButton(); //create a updated game button

      console.log("game added to gameList: " + game.name);
      game.gameBtn.appendTo($( '#gameList' ));

      game.gameBtn.on("click", { game:game }, function (event)
        {
          console.log("game clicked with name: " + game.name);
          event.data.game.select();
        });
    });
  }

  public toString(): string
  {
    const lineStr = "/// line toString: " + this.name + " /// \n ExampleGames: ";
    for(let x = 0; x < this.exampleGames.length; x++)
    {
      lineStr + this.exampleGames[x] + "\n";
    }
    return lineStr;
  }
}
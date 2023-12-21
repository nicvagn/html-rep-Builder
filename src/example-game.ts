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
//import { controller } from "./index.js";
import { EditRepertoireController } from "./edit-repertoire-controller.mjs";
import { checkDeleteMode } from "./index.js";
import { Controller } from "./repertoire-controller.mjs";
import { gameJSON } from "./save-control.js";
//import { RepertoireLine } from "./repertoire-line.js";


/**
 * a chess repertoire example game.
 */
export class ExampleGame
{

  public name: string; //game name
  studyURL: string; //the lichess study url

  public gameBtn!: JQuery<HTMLElement>;

  /**
   * construct a new repertoire game
   * @param {string} name the name of the game
   */
  constructor(name: string, studyURL: string)
  {
    console.log("Example Game constructed.")
    this.name = name;

    this.studyURL = studyURL;

    this.createGameButton();

  }

  public createGameButton(): void
  {
    //create the visual button for the gui
    this.gameBtn =
    $('<button/>', {
      text: this.name, //set text 1 to 10
      id: this.name,
    });

    //create the visual rep of the game on construction
    this.gameBtn.addClass("repGame delete-mode");

    this.gameBtn.on("click", {game:this}, function (event)
    {
      event.data.game.select(event.data.game);
    });
  }

  /**
   * select this game
   * @param game the ExampleGame to show
   */
  public select(game?:ExampleGame)
  {

    //needed for calling from the dom buttons
    if(game == undefined)
    {
      //check if it should be deleted, not opened
      if( checkDeleteMode() )
      {
        EditRepertoireController.delete(this);
        return;
      }
      Controller.changeStudy(this);
    }
    else
    {
      //check if it should be deleted, not opened
      if( checkDeleteMode() )
      {
        EditRepertoireController.delete(game);
        return;
      }
      Controller.changeStudy(game);
    }
  }

  /**
   * take a json example game, and make a real one
   * @param json the json representation of the example game
   * @returns the made ExampleGame
   */
  public static fromJSON(json: gameJSON): ExampleGame
  {
    return new ExampleGame(json.name_key, json.studyURL);
  }

  /**
   * game json example game for saving
   */
  public toJSON(): gameJSON
  {
    // toJSON is automatically used by JSON.stringify
    const gameJSON = {
      name_key: this.name,
      type: 'game',
      studyURL: this.studyURL,
    }
    return gameJSON;
  }

  public toString():string
  {
    return "name: " + this.name + "studyURL: " + this.studyURL;
  }
}
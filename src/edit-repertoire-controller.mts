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

import { BoardState } from "./board-state.js";
import { ExampleGame } from "./example-game.js";
import { RepertoireLine } from "./repertoire-line.js";
import { controller } from "./repertoire-controller.mjs";
import { FEN } from "./chess-notation.js";


//get the various NewRepertoire buttons
const editLineBtn = document.getElementById("editLine");
const resetLinesBtn = document.getElementById("resetLines");
const resetGamesBtn = document.getElementById("resetGames");
const saveBrowserBtn = document.getElementById("saveBrowser");

let editRepertoireController: EditRepertoireController;

/**
 * helper for creating new reps
 */
export class EditRepertoireController
{

  gameList: Array<ExampleGame>;
  lineList: Array<RepertoireLine>;
  boardState: BoardState;

  constructor()
  {
    console.log("EditRepertoireController constructed");
    //add listeners
    editLineBtn?.addEventListener("click", buttonLnr);
    resetLinesBtn?.addEventListener("click", buttonLnr);
    resetGamesBtn?.addEventListener("click", buttonLnr);
    saveBrowserBtn?.addEventListener("click", buttonLnr);

    //make a local file scope variable, so the button listeners can access the controller class
    editRepertoireController = this;

    //make a reference for the original controller
    this.boardState = controller.boardState;

    //test data
    this.gameList = [new ExampleGame("game", controller.obj_pgn, new FEN("rnb1kbnr/pp2pppp/3p4/q1p5/2P2P2/6P1/PP1PP2P/RNBQKBNR w KQkq - 1 4"))];
    this.lineList = [new RepertoireLine("Line")]
  }

  /**
   *  edit a line, you can add games to a line, change the name, etc. Shows a popup
   * to accomplish this
   */
  public editLine():void
  {
    //edit line
    console.log("EditLine entered");
    const windowFeatures = "width=500, height=400,popup";
    window.open("AddPgn.html", "mozillaWindow", windowFeatures);
  }

  public resetLines():void
  {
    //reset lines
  }

  public resetGames():void
  {
    //reset games
  }

  public saveToBrowser():void
  {
    //save to browser
  }
}

/**
 * the listener for the addGame and addLine buttons
 * @param event the event that triggered
 */
function buttonLnr(event: Event):void
{
  if(event.target == editLineBtn)
  {
    console.log("Edit Line btn was the target");

    editRepertoireController.editLine();
  }
  else if(event.target == resetLinesBtn)
  {
    console.log("reset Lines btn");
    //reset lines
    editRepertoireController.resetLines();
  }
  else if(event.target == resetGamesBtn)
  {
    console.log("reset games btn");
    //reset games
    editRepertoireController.resetGames();
  }
  else if(event.target == saveBrowserBtn)
  {
    console.log("save browser btn");
    //save to browser
    editRepertoireController.saveToBrowser();
  }
  else
  {
    throw Error("event target was: " + event.target + " this is not one of the buttons.");
  }
}

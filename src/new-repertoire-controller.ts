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

//import { Controller, controller } from "./repertoire-controller.mjs";

//get the various NewRepertoire buttons
const addLineBtn = document.getElementById("addLine");
const addGameBtn = document.getElementById("addGame");
const resetLinesBtn = document.getElementById("resetLines");
const resetGamesBtn = document.getElementById("resetGames");
const saveBrowserBtn = document.getElementById("saveBrowser");

/**
 * helper for newRep.html aides in creation of new reps
 */
export class NewRepertoireController {
  constructor()
  {
    //add listeners
    addLineBtn?.addEventListener("click", buttonLnr);
    addGameBtn?.addEventListener("click", buttonLnr);
    resetLinesBtn?.addEventListener("click", buttonLnr);
    resetGamesBtn?.addEventListener("click", buttonLnr);
    saveBrowserBtn?.addEventListener("click", buttonLnr);
  }

  /**
   * show add game popup to add a game to this line
   */
  public showAddGame()
  {
    const windowFeatures = "width=320,height=320,popup";
    window.open("AddGame.html", "mozillaWindow", windowFeatures);
  }

  /**
   * show the add line popup to add a game to this line
   */
  public showAddLine()
  {
    const windowFeatures = "width=320,height=320,popup";
    window.open("AddLine.html", "mozillaWindow", windowFeatures);
  }
}

/**
 * the listener for the addGame and addLine buttons
 * @param event the event that triggered
 */
function buttonLnr(event: Event)
{
  if(event.target == addLineBtn)
  {
    console.log("Add Line btn");
    //addLineBtn was the target
  }
  else if(event.target == addGameBtn)
  {
    console.log("Add game Btn");
    //add game btn was the target
  }
  else if(event.target == resetLinesBtn)
  {
    console.log("reset Lines btn");

    //reset lines
  }
  else if(event.target == resetGamesBtn)
  {
    console.log("reset games btn");

    //reset games
  }
  else if(event.target == saveBrowserBtn)
  {
    console.log("save browser btn");

    //save to browser
  }
  else
  {
    throw Error("event target was: " + event.target + " this is not one of the buttons.");
  }
}
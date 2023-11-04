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

import { Controller } from "./repertoire-controller.mjs";

//add event listeners to various buttons
const addLineBtn = document.getElementById("addLine");
const addGameBtn = document.getElementById("addGame");
const resetLinesBtn = document.getElementById("resetLines");
const resetGamesBtn = document.getElementById("resetGames");
const saveBrowserBtn = document.getElementById("saveBrowser");

/**
 * helper for newRep.html aides in creation of new reps
 */
export class newRepertoire
{

  controller: Controller;

  constructor(controller:Controller){

    this.controller = controller;

    //add listeners
    addLineBtn?.addEventListener("click", buttonLnr);
    addGameBtn?.addEventListener("click", buttonLnr);
    resetLinesBtn?.addEventListener("click", buttonLnr);
    resetGamesBtn?.addEventListener("click", buttonLnr)
    saveBrowserBtn?.addEventListener("click", buttonLnr);
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
    //addLineBtn was the target
  }
  else if(event.target == addGameBtn)
  {
    //add game btn was the target
  }
  else if(event.target == resetLinesBtn)
  {
    //reset lines
  }
  else if(event.target == resetGamesBtn)
  {
    //reset games
  }
  else if(event.target == saveBrowserBtn)
  {
    //save to browser
  }
  else{
    throw Error("event target was: " + event.target + " this is not one of the buttons.");
  }
}
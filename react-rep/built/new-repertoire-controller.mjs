/**************************************************************
 * a typescript chess repertoire builder. including line and example game viewing made for shcc
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
 ************************************************************/
import { ExampleGame } from "./example-game.js";
import { RepertoireLine } from "./repertoire-line.js";
//import { Controller, controller } from "./repertoire-controller.mjs";
//get the various NewRepertoire buttons
const addLineBtn = document.getElementById("addLine");
const addGameBtn = document.getElementById("addGame");
const resetLinesBtn = document.getElementById("resetLines");
const resetGamesBtn = document.getElementById("resetGames");
const saveBrowserBtn = document.getElementById("saveBrowser");
let newRepertoireController;
/**
 * helper for newRep.html aides in creation of new reps
 */
export class NewRepertoireController {
    constructor(controller) {
        //add listeners
        addLineBtn === null || addLineBtn === void 0 ? void 0 : addLineBtn.addEventListener("click", buttonLnr);
        addGameBtn === null || addGameBtn === void 0 ? void 0 : addGameBtn.addEventListener("click", buttonLnr);
        resetLinesBtn === null || resetLinesBtn === void 0 ? void 0 : resetLinesBtn.addEventListener("click", buttonLnr);
        resetGamesBtn === null || resetGamesBtn === void 0 ? void 0 : resetGamesBtn.addEventListener("click", buttonLnr);
        saveBrowserBtn === null || saveBrowserBtn === void 0 ? void 0 : saveBrowserBtn.addEventListener("click", buttonLnr);
        //show all the new repertoire elements
        $(".newRep").show();
        //make a local file scope variable, so the button listeners can access the controller class
        newRepertoireController = this;
        //make a reference for the original controller
        this.controller = controller;
        this.boardState = controller.boardState;
        this.gameList = [new ExampleGame("game", controller.obj_pgn)];
        this.lineList = [new RepertoireLine("Line")];
    }
    /**
     * show add game popup to add a game to this line
     */
    showAddGame() {
        console.log("showAddGame() entered");
        const windowFeatures = "width=1200, height=800, popup";
        window.open("AddGame.html", "mozillaWindow", windowFeatures);
    }
    addGame() {
    }
    /**
     * show the add line popup to add a game to this line
     */
    showAddLine() {
        console.log("showAddLine() entered");
        const windowFeatures = "width=320,height=320,popup";
        window.open("AddLine.html", "mozillaWindow", windowFeatures);
    }
    resetLines() {
        //reset lines
    }
    resetGames() {
        //reset games
    }
    saveToBrowser() {
        //save to browser
    }
}
/**
 * the listener for the addGame and addLine buttons
 * @param event the event that triggered
 */
function buttonLnr(event) {
    if (event.target == addLineBtn) {
        console.log("Add Line btn");
        //addLineBtn was the target
        newRepertoireController.showAddLine();
    }
    else if (event.target == addGameBtn) {
        console.log("Add game Btn");
        //add game btn was the target
        newRepertoireController.showAddGame();
    }
    else if (event.target == resetLinesBtn) {
        console.log("reset Lines btn");
        //reset lines
        newRepertoireController.resetLines();
    }
    else if (event.target == resetGamesBtn) {
        console.log("reset games btn");
        //reset games
        newRepertoireController.resetLines();
    }
    else if (event.target == saveBrowserBtn) {
        console.log("save browser btn");
        //save to browser
        newRepertoireController.saveToBrowser();
    }
    else {
        throw Error("event target was: " + event.target + " this is not one of the buttons.");
    }
}
/**
 * a submit function for the popup windows
 */
export function submit(sender) {
    alert("the result from pop " + sender.getAttribute("result"));
    try {
        window.opener.HandlePopupResult(sender.getAttribute("result"));
    }
    catch (err) { }
    window.close();
    return false;
}
/*
function CloseMySelf(sender) {
  try {
      window.opener.HandlePopupResult(sender.getAttribute("result"));
  }
  catch (err) {}
  window.close();
  return false;
}
*/ 

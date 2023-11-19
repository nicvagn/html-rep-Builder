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
/*
import { BoardState } from "./board-state.js";
import { ExampleGame } from "./example-game.js";
import { RepertoireLine } from "./repertoire-line.js";
import { controller } from "./index.js";
import { FEN } from "./chess-notation.js";
*/
//get the various NewRepertoire buttons
var editLineBtn = document.getElementById("editLine");
var resetLinesBtn = document.getElementById("resetLines");
var resetGamesBtn = document.getElementById("resetGames");
var saveBrowserBtn = document.getElementById("saveBrowser");
var editRepertoireController;
/**
 * helper for creating new reps
 */
var EditRepertoireController = /** @class */ (function () {
    function EditRepertoireController() {
        console.log("EditRepertoireController constructed");
        //add listeners
        editLineBtn === null || editLineBtn === void 0 ? void 0 : editLineBtn.addEventListener("click", buttonLnr);
        resetLinesBtn === null || resetLinesBtn === void 0 ? void 0 : resetLinesBtn.addEventListener("click", buttonLnr);
        resetGamesBtn === null || resetGamesBtn === void 0 ? void 0 : resetGamesBtn.addEventListener("click", buttonLnr);
        saveBrowserBtn === null || saveBrowserBtn === void 0 ? void 0 : saveBrowserBtn.addEventListener("click", buttonLnr);
        //set the file input...
        $("#fileInput").on("change", null, function (event) {
            //the event target will be the input element
            var addPGNBtn = event.target;
            if (addPGNBtn.files == null) {
                throw Error("addPGNBtn.files is null.");
            }
            var file = addPGNBtn.files[0]; //get the first file
            var name = file.name;
            console.log(name);
        });
        //make a local file scope variable, so the button listeners can access the controller class
        editRepertoireController = this;
    }
    /**
     *  edit a line, you can add games to a line, change the name, etc. Shows a popup
     * to accomplish this
     */
    EditRepertoireController.prototype.editLine = function () {
        //edit line
        console.log("EditLine entered");
        var windowFeatures = "width=500, height=400,popup";
        window.open("AddPgn.html", "mozillaWindow", windowFeatures);
    };
    EditRepertoireController.prototype.resetLines = function () {
        //reset lines
    };
    EditRepertoireController.prototype.resetGames = function () {
        //reset games
    };
    EditRepertoireController.prototype.saveToBrowser = function () {
        //save to browser
    };
    return EditRepertoireController;
}());
export { EditRepertoireController };
/**
 * the listener for the addGame and addLine buttons
 * @param event the event that triggered
 */
function buttonLnr(event) {
    if (event.target == editLineBtn) {
        console.log("Edit Line btn was the target");
        editRepertoireController.editLine();
    }
    else if (event.target == resetLinesBtn) {
        console.log("reset Lines btn");
        //reset lines
        editRepertoireController.resetLines();
    }
    else if (event.target == resetGamesBtn) {
        console.log("reset games btn");
        //reset games
        editRepertoireController.resetGames();
    }
    else if (event.target == saveBrowserBtn) {
        console.log("save browser btn");
        //save to browser
        editRepertoireController.saveToBrowser();
    }
    else {
        throw Error("event target was: " + event.target + " this is not one of the buttons.");
    }
}
//# sourceMappingURL=edit-repertoire-controller.mjs.map
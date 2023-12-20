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
import { RepertoireLine } from "./repertoire-line.js";
import { Repertoire } from "./repertoire.js";
/**
 * helper for creating new reps
 */
export declare class EditRepertoireController {
    /**
     * html for dom manipulation
     */
    static readonly addStudyEmbed = "<div id=\"centerPane\" class=\"centerPane\">\n    <div id=\"addStudyEmbed\">\n\n      <div id=\"URLInstructions\" style=\"margin: 15px auto;\" >\n          <h3 style=\"margin: 3px auto;\">The current chapter URL is what is needed. It can be found under at\n            lichess.org/studies/... here: </h3>\n          <br>\n          <img style=\"margin: 15px auto;\" src=\"./images/url_location.png\">\n      </div>\n\n      <div>\n        <span class=\"inputSpan\">\n\n          <h1>Line:</h1>\n          <!-- game/line switch -->\n          <label class=\"switch\">\n            <input type=\"checkbox\" id=\"lineToggle\">\n            <span class=\"slider\"></span>\n          </label>\n\n          <label for=\"studyTextField\">Lichess study chapter url: </label>\n          <input type=\"text\" id=\"studyTextField\" name=\"studyTextField\">\n          <button id=\"addURL\" style=\"width: 35px;\">Add</button>\n          <button id=\"done\" style=\"width: 35px;\"></button>\n        </span>\n      </div>\n    </div>\n  </div>";
    static readonly chessBoardEmbed = "<div id=\"centerPane\" class=\"centerPane\">\n\n    <div id=\"chessgroundContainer\" >\n      <!-- Main Chessboard -->\n      <img id=\"chessground\" style=\"object-fit: contain;\" src=\"images/thinking.jpg\" frameborder=0></img>\n    </div>\n  </div>";
    static readonly newRepertoirePane = "\n  <div id=\"newRepControls\">\n    <div id=\"URLInstructions\" style=\"margin: 15px auto;\" >\n      <h3 style=\"margin: 3px auto;\">The studies current chapter URL is what is needed. It can be found under at\n        lichess.org/studies/... here: </h3>\n      <br>\n      <img style=\"margin: 15px auto;\" src=\"./images/url_location.png\">\n    </div>\n\n    <h2>Repertoire Creation</h2>\n    <br>\n    <label style=\"text-align: left\" for=\"repertoireName\"> Repertoire  Name: </label>\n    <input type=\"text\" id=\"repertoireName\" name=\"repertoireName\">\n    <br>\n    <label style=\"text-align: left\" for=\"repertoireURL\">Main chapter URL: </label>\n    <input type=\"text\"  id=\"repertoireURL\" name=\"repertoireURL\">\n    <br>\n    <button id=\"newRepControlSubmit\"> submit </button>\n  </div>\n  ";
    static readonly LinesToAddGameEmbed = "<div id=\"centerPane\" class=\"centerPane\">\n    <h2 style='margin: 15px 0; text-align: center;'>  Line options: </h2>\n  </div>";
    static readonly repsToAddLineToEmbed = "<div id=\"centerPane\" class=\"centerPane\">\n    <h2 style='margin: 15px 0; text-align: center;'> Repertoire options: </h2>\n  </div> ";
    constructor();
    /**
     * set up the new repertoire controls and center pane
     */
    static showNewRepPane(): void;
    /**
     * open lichess study creation
     */
    static createStudy(): void;
    /**
     * delete thing
     * @param thing
     */
    static delete(thing: RepertoireLine | ExampleGame | Repertoire): void;
    /**
     * listener for the fileInput input elem
     */
    static fileInputLnr(): void;
    /**
     * the listener for the addGame and addLine buttons
     * @param event the event that triggered
     */
    static buttonLnr(event: Event): void;
    /**
     * make all the edit repertoire controls hidden
     */
    static hideEditRepertoire(): void;
    /**
     * show the lines you can add an example game to
     * @param game example game to add on click
     */
    static showLinesToAddGameTo(game: ExampleGame): void;
    /**
     * display a list of repertoires repButtons that you can add line to
     * @param line the line to add to the chosen rep
     */
    static showRepsToAddLineTo(line: RepertoireLine): void;
    /**
     * add the listeners to the add study buttons, etc
     */
    static setAddStudyListeners(): void;
    /**
     * prepare the embed
     */
    static showAddStudy(): void;
}

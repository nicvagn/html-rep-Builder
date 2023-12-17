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
    /** $$$ MODES $$$ */
    deleteMode: boolean;
    /**
     * html for dom manipulation
     */
    readonly addStudyEmbed = "<div id=\"centerPane\" class=\"centerPane\">\n    <div id=\"addStudyEmbed\">\n\n      <div id=\"URLInstructions\" style=\"margin: 15px auto;\" >\n          <h3 style=\"margin: 3px auto;\">The current chapter URL is what is needed. It can be found under at\n            lichess.org/studies/... here: </h3>\n          <br>\n          <img style=\"margin: 15px auto;\" src=\"./images/url_location.png\">\n      </div>\n\n      <div>\n        <span class=\"inputSpan\">\n\n          <h1>Line:</h1>\n          <!-- game/line switch -->\n          <label class=\"switch\">\n            <input type=\"checkbox\" id=\"lineToggle\">\n            <span class=\"slider\"></span>\n          </label>\n\n          <label for=\"studyTextField\">Lichess study chapter url: </label>\n          <input type=\"text\" id=\"studyTextField\" name=\"studyTextField\">\n          <button id=\"addURL\" style=\"width: 35px;\">Add</button>\n          <button id=\"done\" style=\"width: 35px;\"></button>\n        </span>\n      </div>\n    </div>\n  </div>";
    readonly chessBoardEmbed = "<div id=\"centerPane\" class=\"centerPane\">\n\n    <div id=\"chessgroundContainer\" >\n      <!-- Main Chessboard -->\n      <img id=\"chessground\" style=\"object-fit: contain;\" src=\"images/thinking.jpg\" frameborder=0></img>\n    </div>\n  </div>";
    readonly LinesToAddGameEmbed = "<div id=\"centerPane\" class=\"centerPane\">\n    <h2 style='margin: 15px 0; text-align: center;'>  Line options: </h2>\n  </div>";
    readonly repsToAddLineToEmbed = "<div id=\"centerPane\" class=\"centerPane\">\n    <h2 style='margin: 15px 0; text-align: center;'> Repertoire options: </h2>\n  </div> ";
    constructor();
    /**
     * open lichess study creation
     */
    createStudy(): void;
    /**
     * enter mode where the next rep, line or game chosen is removed
     */
    enterDeleteMode(): void;
    /**
     * exit delete mode
     */
    exitDeleteMode(): void;
    /**
     * delete thing
     * @param thing
     */
    delete(thing: RepertoireLine | ExampleGame | Repertoire): void;
}
/**
 * reset back to chessboard view
 */
export declare function chessBoardView(): void;

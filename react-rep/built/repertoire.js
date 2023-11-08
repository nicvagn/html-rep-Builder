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
import { SaveController } from "./save-controller.js";
/**
 * A chess repertoire
 */
export class Repertoire {
    /**
     * make a new Rep
     * @param {string} _name name to give
     * @param lineList list of lines in this rep
     * @param gameList list of instructive games
     */
    constructor(_name, _lineList) {
        console.log("rep with name:" + _name + ", Line List: " + _lineList + "made");
        if (_name == undefined) {
            this.name = prompt("What would you like to call the new repertoire?");
        }
        this.name = _name;
        //set the game and line list to the ones provided to the constructor
        this.lineList = _lineList;
    }
    /**
     * make a Repertoire with only a name
     * @param {string} _name? would be this reps name
     * @returns a Repertoire with a name and nothing else
     */
    repertoireOnlyName(_name) {
        if (this.name != undefined && this.name != null) {
            this.name = prompt("What would you like to call the new repertoire?");
            console.log("rep with only name called, with no name");
        }
        else {
            this.name = _name;
            console.log("rep with only name called, with a name");
        }
        return new Repertoire(this.name);
    }
    /**
     * add a line to this repertoire object
     * @param repLine - a RepertoireLine
     */
    addLine(repLine) {
        //if the line list is undefined
        if (this.lineList == undefined) {
            this.lineList = [repLine];
        }
        else //otherwise, push it on
         {
            this.lineList.push(repLine);
        }
    }
    /**
     * reset the lineList to undefined
     */
    resetLines() {
        if (this.lineList == undefined) {
            return; // if line list is already undefined
        }
        if (confirm("reset lines?")) { //confirm reset lines
            //make the line list undefined again
            this.lineList = undefined;
        }
    }
    /**
     * save this rep to local storage with its key being it's name
     */
    saveRep() {
        SaveController.getRepertoireFromLocal(this.name);
    }
}

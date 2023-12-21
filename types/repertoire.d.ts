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
/// <reference types="jquery" />
/// <reference types="jquery" />
import { RepertoireLine } from "./repertoire-line.js";
import { repJSON } from "./save-control.js";
/**
 * A chess repertoire
 */
export declare class Repertoire {
    name: string;
    lineList: RepertoireLine[];
    private currentOpenLine;
    mainLine: RepertoireLine;
    nameLabel: HTMLElement;
    repertoireBtn: JQuery<HTMLElement>;
    /**
     * make a new Rep
     * @param {string} name name to give
     * @param studyURL the lichess url of the primary study chapter of this rep
     * @param lineList list of lines in this rep
     */
    constructor(name: string, studyURL: string, lineList?: RepertoireLine[]);
    /**
     * prepare repertoire for saving as json
     * @returns JSON of this object for saving
     */
    toJSON(): repJSON;
    /**
     * take a json rep, and create a new rep Object
     * @param repjson of the repertoire
     * @returns the new created rep with all the old reps data
     */
    static fromJSON(repjson: repJSON): Repertoire;
    /**
     * get the line keys lines are stored under in LS
     * @returns the line keys for getting lines from LS
     */
    private getLineKeys;
    /**
     * create the rep button and add it to the DOM
     * with a lister attached the rep must have a name
     */
    private createRepBtn;
    /**
     * add a line to this repertoire object
     * @param repLine - a RepertoireLine
     */
    addLine(repLine: RepertoireLine): void;
    /**
     * display the lines on the DOM
     */
    updateLineDisplay(): void;
    /**
     * reset the lineList to empty
     */
    resetLines(): void;
    /**
     * save this rep to local storage with its key being it's name
     */
    saveRep(): void;
    /**
     * get the open line, throws error if no open line
     * @returns the open repertoire line
     */
    getOpenLine(): RepertoireLine;
    /**
     * open a RepLine line and corresponding game list
     * @param line Line to open
     */
    openLine(line: RepertoireLine): void;
    /**
     * select this repertoire, for deletion or to be put on big board
     */
    select(): void;
    /**
    * get the rep button for this repertoire
    * @returns the RepButton element
    */
    getRepButton(): JQuery<HTMLElement>;
    toString(): string;
}

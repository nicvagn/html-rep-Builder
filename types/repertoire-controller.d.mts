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
import { Repertoire } from "./repertoire.js";
import { EditRepertoireController } from "./edit-repertoire-controller.mjs";
import { RepertoireLine } from "./repertoire-line.js";
import { ExampleGame } from "./example-game.js";
/**
 * the main controller , handles repertoire creation, keeps track of open stuff and does the dishes
 */
export declare class Controller {
    openRepName?: string;
    openRep?: Repertoire;
    repList: Repertoire[];
    boardSpot?: JQuery<HTMLElement>;
    localReps: JQuery<HTMLElement>;
    iframeHeight: string;
    iframeWith: string;
    iframeStart: string;
    iframeEnd: string;
    editRepController?: EditRepertoireController;
    nameLabel: HTMLElement;
    /**
     * construct a new repertoire controller
     */
    constructor();
    /**
     * add a repertoire to this controller
     * this means add it to the local rep list
     */
    private addRepertoire;
    /**
     * set the name element
     */
    setNameElement(name: string): void;
    /**
     * get currently open repertoire
     * @returns the open rep
     */
    getOpenRep(): Repertoire;
    /**
     * open a repertoire
     */
    openRepertoire(rep: Repertoire): void;
    /**
     * reset the line ang game lists
     */
    resetLists(): void;
    /**
     * make a new repertoire, promoting the user for it's name if not provided.
     * and displaying all the controls for making one. And set it as the open rep
     * and return it
     * @returns a new rep
     */
    newRepertoireUser(name?: string, save?: boolean): Repertoire;
    /**
     * make a new repertoire, with no user input and do not set it as the open rep
     * or clear the lines
     * @returns a new rep
     */
    newRepertoireSystem(name: string): Repertoire;
    /**
     * create an edit controller, and display all the controls for editing a rep
     */
    editRepertoire(): void;
    /**
     * change the study on the main board
     *  to display on the board
     */
    changeStudy(chessThing: RepertoireLine | ExampleGame | Repertoire): void;
}

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
    editRepController: EditRepertoireController;
    /**
     * construct a new repertoire controller
     */
    constructor(repList?: Repertoire[]);
    /**
     * reset back to chessboard view
     */
    static chessBoardView(): void;
    /**
     * hide the ChessBoardView this consists of the main board pane and side columns
     */
    static hideChessBoardView(): void;
    /**
     * hide columns
     */
    static hideColumns(): void;
    static showColumns(): void;
    /**
     * load a controller with an array of repertoires already loaded.
     * @param repList the repertoires that are saved
     */
    private loadController;
    /**
     * add a repertoire to this controller
     * this means add it to the local rep list
     */
    addRepertoire(rep: Repertoire): void;
    /**
     * set the name element
     */
    static setNameElement(name: string): void;
    /**
     * get currently open repertoire, throws error if no open rep
     * @returns the open rep
     */
    getOpenRep(): Repertoire;
    /**
     * open a repertoire
     * @param rep the repertoire to load
     */
    openRepertoire(rep: Repertoire): void;
    /**
     * reset the line ang game lists to the ones in the open repertoire
     */
    updateOpenRepLists(): void;
    /**
     * update list of repertoires we can access.
     */
    updateRepList(): void;
    /**
     * make a new repertoire, with no user input and do not set it as the open rep
     * or clear the lines
     * @returns a new rep
     */
    newRepertoire(name: string, studyURL: string): Repertoire;
    /**
     * display all the controls for editing a rep
     */
    static editRepertoire(): void;
    /**
     * change the study on the main board to a provided chess thing's study
     * @param chessThing the chessThing with a .studyURL to add to the main board
     */
    static changeStudy(chessThing: RepertoireLine | ExampleGame): void;
    toString(): string;
}

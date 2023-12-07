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
import { Repertoire } from "./repertoire.js";
import { Controller } from "./repertoire-controller.mjs";
import { ExampleGame } from "./example-game.js";
export interface gameJSON {
    name: string;
    studyURL: string;
}
export interface lineJSON {
    name: string;
    studyURL: string;
}
/**
 * retrieve from local storage
 * @param {string} key the key of the item to be retrieve
 * @returns the retrieve item as JSON, or null on error
 */
export declare function getFromLocal(key: string): gameJSON | null;
export declare function saveRep(rep: Repertoire): void;
/**
 * save a chess game. The key will be it's name
 */
export declare function saveGame(game: ExampleGame): void;
/**
 * load all the pertinent details from local storage to load an ExampleGame
 * returns null if nothing is found or data is not complete
 * @param key the key the game is stored under
 */
export declare function loadGame(key: string): ExampleGame | null;
/**
 * save everything so the state of the controller can be reconstructed from the save
 */
export declare function save(): void;
/**
 * load save into a controller
 * @param controller the controller to load the save into
 */
export declare function load(controller: Controller): void;

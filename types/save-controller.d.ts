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
import { ExampleGame } from "./example-game.js";
import { RepertoireLine } from "./repertoire-line.js";
import { Controller } from "./repertoire-controller.mjs";
export interface gameJSON {
    name_key: string;
    type: string;
    studyURL: string;
}
export interface lineJSON {
    name_key: string;
    type: string;
    studyURL: string;
    exampleGameKeys: string[];
}
export interface repJSON {
    name_key: string;
    type: string;
    studyURL: string;
    lineKeys: string[];
}
/**
 * save a rep
 * @param rep repertoire to save
 */
export declare function saveRep(rep: Repertoire): void;
/**
 * load all the pertinent details from local storage to load an ExampleGame
 * returns null if nothing is found or data is not complete
 * @param key the key the game is stored under
 * @returns the Example game corresponding to that gameJSON under that key
 * if it is valid, else throw an error
 */
export declare function loadGame(key: string): ExampleGame;
/**
 * load a line from a key for JSON in local storage
 * @param key the key for the lineJSON in local storage
 * @returns a rep line made from that JSON
 */
export declare function loadLine(key: string): RepertoireLine;
/**
 * load an entire repertoire from local storage
 * @param key the key to find the rep we have to load under in local storage
 * @returns the loaded Repertoire
 */
export declare function loadRep(key: string): Repertoire;
/**
 * save repertoire keys/names so the state of the
 * controller can be reconstructed from the save
 */
export declare function save(): void;
/**
 * load save into a Controller and return it.
 * @returns Controller made.
 */
export declare function load(): Controller;
/**
 * load from a json file provided by file input.
 * @param save the save file, containing save JSON
 * @returns true if successful loaded else false
 */
export declare function loadFromFile(save: File): Promise<boolean>;
/**
 * prepare a download of the repList, containing all the reps
 */
export declare function download(): void;

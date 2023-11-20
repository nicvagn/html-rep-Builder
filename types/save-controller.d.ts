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
/**
 * a helper class full of static methods to aid in saving to local storage
 */
export declare class SaveController {
    /**
     * Save a Repertoire to Local Storage
     * @param { string } key the key to put this under in local storage
     * @param { Repertoire } rep the repertoire to save to local storage
     */
    static saveRepToLocal(key: string, rep: Repertoire): void;
    /**
     * get a repertoire from local storage
     * @param {string} repKey the name of the rep
     * @returns {Repertoire} the repertoire you opened as json
     */
    static getRepertoireFromLocal(repKey: string): Repertoire;
    /**
     * retrieve from local storage
     * @param {string} key the key of the item to be retrieve
     * @returns the retrieve item in json
     */
    private static getFromLocal;
    /**
     * put a object in local storage. We will turn it into JSON and store it
     * @param key the key to put that object's json under in local. The key is used to retrieve the item
     * @param object a javascript object to be put into storage
     */
    private static putLocal;
}

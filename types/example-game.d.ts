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
import { gameJSON } from "./save-controller.js";
/**
 * a chess repertoire example game.
 */
export declare class ExampleGame {
    name: string;
    studyURL: string;
    gameBtn: JQuery<HTMLElement>;
    /**
     * construct a new repertoire game
     * @param {string} name the name of the game
     */
    constructor(name: string, studyURL: string);
    createGameButton(): void;
    /**
     * select this game
     * @param game the ExampleGame to show
     */
    select(game?: ExampleGame): void;
    /**
     * take a json example game, and make a real one
     * @param json the json representation of the example game
     * @returns the made ExampleGame
     */
    static fromJSON(json: gameJSON): ExampleGame;
    /**
     * game json example game for saving
     */
    toJSON(): gameJSON;
    toString(): string;
}

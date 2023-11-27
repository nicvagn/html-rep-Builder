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
import { ExampleGame } from "./example-game.js";
import { PGN } from "./chess-notation.mjs";
/**
 * a chess repertoire line. It's primary use is in a rep builder GUI, so it needs to have a visual
 * component
 */
export declare class RepertoireLine {
    name: string;
    pgn: PGN;
    exampleGames: ExampleGame[];
    lineBtn: JQuery<HTMLElement>;
    /**
     * construct a new repertoire line
     * @param name the name of the line
     * @param pgn the pgn of this line
     * @param exampleGames any example games of this line in action
     */
    constructor(name: string, pgn: PGN, exampleGames?: ExampleGame[]);
    /**
     * reset the gameList to empty
     */
    resetGames(): void;
    /**
     * add an example game to this line
     * @param game ExampleGame to add
     */
    addGame(game: ExampleGame): void;
    /**
     * get the example games for this line
     * @returns this lines example games
     */
    getGames(): ExampleGame[];
    /**
     * display array gameList in html page
     */
    openLine(): void;
}

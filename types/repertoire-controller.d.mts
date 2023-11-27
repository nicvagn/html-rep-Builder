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
import { BoardState } from "./board-state.mjs";
import { PGN, FEN } from "./chess-notation.mjs";
import { EditRepertoireController } from "./edit-repertoire-controller.mjs";
import { ExampleGame } from "./example-game.js";
/**
 * the main controller , handles repertoire creation, keeps track of open stuff and does the dishes
 */
export declare class Controller {
    openRepName?: string;
    openRep?: Repertoire;
    readonly boardState?: BoardState;
    editRepController?: EditRepertoireController;
    boardSpot: HTMLElement | null;
    nameLabel: HTMLElement;
    text_PGN1: string;
    obj_pgn1: PGN;
    text_PGN2: string;
    obj_pgn2: PGN;
    test_FENS: [FEN, FEN];
    game1: ExampleGame;
    game2: ExampleGame;
    /**
     * construct a new rep with a name maybe
     */
    constructor();
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
     * make a new repertoire, promoting the user for it's name if not provided.
     * and displaying all the controls for making one. And set it as the open rep
     * and return it
     * @returns a new rep
     */
    newRepertoire(name?: string): Repertoire;
    /**
     * create an edit controller, and display all the controls for editing a rep
     */
    editRepertoire(): void;
    /**
     * change the game on the main board
     * game game to display on the board
     */
    changeExampleGame(game: ExampleGame): void;
}

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
import { PGN } from "./chess-notation.mjs";
/**
 * a wrapper around Chessground and chess.js
 */
export declare class BoardState {
    boardRoot: HTMLElement;
    private config;
    private PgnViewer;
    /**
     * create a new chessground chess board
     * @param boardRoot the root element to  put the board in
     */
    constructor(boardRoot: HTMLElement);
    /**
     * change the orientation of the chessboard
     * @param boardSide can be "black" or "white"
     */
    changeOrientation(boardSide: string): void;
    xxx: {
        viewOnly: boolean;
        pgn: string;
    };
    /**
     * change the pgn on the board
     * @param pgn the pgn to switch to
     */
    setPGN(pgn: PGN): void;
}

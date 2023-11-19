/*********************************************************************************
 * a typescript chess repertoire builder. including line and example game viewing
 *  made for shcc: Saskatchewan Horizon Chess Club
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
/**
 * a PGN but with some nice features for chess programming
 */
var PGN = /** @class */ (function () {
    /**
     * new pgn.
     * @param pgn the basic text pgn
     */
    function PGN(pgn) {
        this.stringPgn = pgn;
    }
    return PGN;
}());
export { PGN };
/**
 * a fen but with some nice features
 */
var FEN = /** @class */ (function () {
    /**
     * new fen.
     * @param fen a fen
     */
    function FEN(fen) {
        this.stringFEN = fen;
    }
    return FEN;
}());
export { FEN };
//# sourceMappingURL=chess-notation.js.map
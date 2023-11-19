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
import { controller } from "./index.mjs";
/**
 * a chess repertoire example game. It's primary use is in a rep builder GUI, so it needs to have a visual
 * component :. extends button
 */
var ExampleGame = /** @class */ (function () {
    /**
     * construct a new repertoire game
     * @param {string} name the name of the game
     * @param {PGN} pgn the pgn of the game
     */
    function ExampleGame(name, pgn, fen) {
        console.log("Example Game constructed.");
        this.name = name;
        this.PGN = pgn;
        this.FEN = fen;
        //create the visual button for the gui
        this.gameBtn =
            $('<button/>', {
                text: this.name,
                id: name,
            });
        //create the visual rep of the game on construction
        this.gameBtn.addClass("repGame");
        this.gameBtn.on("click", { game: this }, function (event) {
            event.data.game.showGame(event.data.game);
        });
    }
    /**
     * change the main board to display this game
     * @param game the ExampleGame to show
     */
    ExampleGame.prototype.showGame = function (game) {
        controller.changeExampleGame(game.FEN);
    };
    return ExampleGame;
}());
export { ExampleGame };
//# sourceMappingURL=example-game.js.map
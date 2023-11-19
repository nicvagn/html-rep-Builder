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
import { Controller } from "./repertoire-controller.mjs";
import { RepertoireLine } from "./repertoire-line.js";
import { ExampleGame } from "./example-game.js";
import { FEN, PGN } from "./chess-notation.js";
export var controller = new Controller();
//will be called when the page is loaded init stuff here
document.addEventListener("DOMContentLoaded", function () {
    //the main controller, needed to make button be able to call controller functions
    console.log("loaded");
    controller.newRepertoire("the only");
    var rep = controller.getOpenRep();
    //example games
    var game1 = new ExampleGame("Game 1", new PGN("xxx"), new FEN("rnbq1rk1/ppp2ppp/3p1n2/4p3/1bP1P3/2N3P1/PP1PNPBP/R1BQK2R b KQ - 1 6"));
    var game2 = new ExampleGame("Game 2", new PGN("XXX"), new FEN("rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2"));
    //lines
    var line1 = new RepertoireLine("Line 1", new PGN(""));
    var line2 = new RepertoireLine("Line 2", new PGN(""));
    //add games to lines
    line1.addGame(game1);
    line1.addGame(game2);
    line2.addGame(game2);
    //add lines to rep
    rep.addLine(line1);
    rep.addLine(line2);
    rep.updateLineDisplay();
});
//# sourceMappingURL=index.mjs.map
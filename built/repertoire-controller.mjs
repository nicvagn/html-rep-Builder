"use strict";
/* a js chess repertoire including lines and example games made for shcc
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
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.openRep = void 0;
var repertoire_js_1 = require("./repertoire.js");
var example_game_js_1 = require("./example-game.js");
var rep_line_js_1 = require("./rep-line.js");
var Save = require("./save-controller.js");
//trying chessground
var chessground_js_1 = require("./node_modules/chessground/dist/chessground.js");
exports.openRep = repertoire_js_1.Repertoire; //the currently open rep
//if the custom elements are not defined, def. them
if (!customElements.get('example-game')) {
    customElements.define('example-game', example_game_js_1.ExampleGame, { extends: "button" });
}
if (!customElements.get('rep-line')) {
    customElements.define('rep-line', rep_line_js_1.RepLine, { extends: "button" });
}
(0, chessground_js_1.Chessground)(document.getElementById('chessground'), {
    fen: 'r2q2k1/1p6/p2p4/2pN1rp1/N1Pb2Q1/8/PP1B4/R6K b - - 2 25',
});
/**
 * make a new repertoire
 * @returns the rep made
 */
function newRepertoire() {
    //the open rep
    var new_rep = new repertoire_js_1.Repertoire();
    var name = prompt("Enter the name you would like to give this Repertoire.");
    new_rep.gameList = document.getElementById("gameList");
    new_rep.lineList = document.getElementById("lineList");
    if (name != null) {
        new_rep.name = name;
    }
    else {
        //give the new rep a random name
        new_rep.name = Math.random().toString(36).slice(2, 7);
    }
    return new_rep;
}
/**
 * change the main the chess board
 * @param {*} element
 */
function changeBoard(element) {
    //get the mainBoard
    var mainBoard = document.getElementById("board");
    //get SRC from the html tag "data-url"
    var SRC = element.dataset.url;
    mainBoard.src = SRC;
}
/**
 * get text from a popup
 * @param {string} boxType the type of the box
 */
function getTextFromPop(boxType) {
    var url = document.getElementById("lichessURL").value;
    var name = document.getElementById('name').value;
    if (boxType === "addGame") {
        console.log("add Game");
        //call function to add game
        addGame(name, url);
    }
    else if (boxType === "addLine") {
        console.log("add line");
        //call function to add line
        addLine(name, url);
    }
    else {
        alert("Unknown box type");
    }
    this.window.close();
}

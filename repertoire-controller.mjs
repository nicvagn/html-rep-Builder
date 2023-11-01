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

import { Repertoire as Repertoire} from "./repertoire.js"
import { ExampleGame as ExampleGame} from "./example-game.js"
import { RepLine as RepLine } from "./rep-line.js";
import * as Save from "./save-controller.js"

//trying chessground
import { Chessground } from "./node_modules/chessground/dist/chessground.js";

export var openRep = Repertoire; //the currently open rep

//if the custom elements are not defined, def. them
if (!customElements.get('example-game')) {
  customElements.define('example-game', ExampleGame, { extends: "button"});
}
if (!customElements.get('rep-line')) {
  customElements.define('rep-line', RepLine, { extends: "button"});
}


Chessground(document.getElementById('chessground'), {
  fen: 'r2q2k1/1p6/p2p4/2pN1rp1/N1Pb2Q1/8/PP1B4/R6K b - - 2 25',
});

//make a new rep
function newRepertoire(){

  //the open rep
  var new_rep = new Repertoire();

  let name = prompt("Enter the name you would like to give this Repertoire.");

  new_rep.gameList = document.getElementById("gameList");

  new_rep.lineList = document.getElementById("lineList");

  if (name != null){
    new_rep.name = name;
  }
  else
  {
    //give the new rep a random name
    new_rep.name = Math.random().toString(36).slice(2, 7);
  }

  return new_rep;
}


//change the src for the chess board
function changeBoard(element) {

  //get the mainBoard
  let mainBoard = document.getElementById("board");
  //get SRC from the html tag "data-url"
  const SRC = element.dataset.url;
  mainBoard.src = SRC;
}

//box type is a string so we can tell the input box this came from
function getTextFromPop(boxType) {

  let url = document.getElementById("lichessURL").value;
  let name = document.getElementById('name').value;

  if(boxType === "addGame"){
    console.log("add Game");

    //call function to add game
    addGame(name, url);
  }
  else if(boxType === "addLine") {
    console.log("add line");

    //call function to add line
    addLine(name, url);
  }
  else {
    alert("Unknown box type");
  }

  this.window.close();
}


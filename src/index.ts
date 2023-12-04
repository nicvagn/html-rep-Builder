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
import { ExampleGame } from "./example-game";
import { RepertoireLine } from "./repertoire-line";

//import our styles, css in ts. We cooking with fire now
import "../css/lichess-pgn-viewer.css";
import "../css/styles.css";


// eslint-disable-next-line no-var
export var controller:Controller;
/*
// test data
let openRep:Repertoire;
*/

let game1: ExampleGame;
let game2: ExampleGame;
let notMade = true;

//will be called when the page is loaded init stuff here
window.onload = () =>
{
  //the main controller, needed to make button be able to call controller functions
  console.log("loaded");

  makeController();
};


function makeController()
{

  if(notMade)
  {
    notMade = false;
    controller = new Controller();

    test();
  }
}


export function test()
{
  ///----------------------- testing ---------------------------------
  //lines

  const line1: RepertoireLine = new RepertoireLine("Line 1", "https://lichess.org/study/embed/TAjrrpST/fLKrg6N9");
  const line2: RepertoireLine = new RepertoireLine("Line 2", "https://lichess.org/study/embed/TAjrrpST/1WyhSAla");
  const line3: RepertoireLine = new RepertoireLine("line 3", "https://lichess.org/study/embed/PYEVM2pA/POney1Ru")

  game1 = new ExampleGame("First Game", "https://lichess.org/study/embed/PYEVM2pA/YCdbBWum");
  game2 = new ExampleGame("second game", "https://lichess.org/study/embed/PYEVM2pA/POney1Ru")

  //add games to lines
  line1.addGame(game1);
  line1.addGame(game2);
  line2.addGame(game2);



  const capo = controller.newRepertoireSystem("Capo can not", "https://lichess.org/study/embed/PYEVM2pA/YCdbBWum");
  capo.addLine(line2);
  capo.addLine(line1);

  const nope = controller.newRepertoireSystem("something, anything", "https://lichess.org/study/embed/PYEVM2pA/POney1Ru");
  nope.addLine(line1);
  nope.addLine(line2);
  nope.addLine(line3);


  showSplashScreen();

  //--------------------------- end ----------------------------------
}

function showSplashScreen()
{
  $( "#chessgroundContainer" ).replaceWith(`<div id="chessgroundContainer" >
                           <!-- Main Chessboard -->
                           <img id="chessground" style="object-fit: contain;" src="images/thinking.jpg" frameborder=0></img>
                         </div>`);
}
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

//import our styles, css in ts. We cooking with fire now
import "../css/lichess-pgn-viewer.css";
import "../css/styles.css";
import { ExampleGame } from "./example-game";
import { RepertoireLine } from "./repertoire-line";
import { Repertoire } from "./repertoire";

// eslint-disable-next-line no-var
export var controller:Controller;

// test data
let openRep:Repertoire;

let game1: ExampleGame;
let game2: ExampleGame;

//will be called when the page is loaded init stuff here
document.addEventListener("DOMContentLoaded",  () =>
{
  //the main controller, needed to make button be able to call controller functions
  console.log("loaded");
  controller = new Controller();
  openRep = controller.getOpenRep();

  test();
});

function test()
{
    ///----------------------- testing --------------
    //lines
    const line1: RepertoireLine = new RepertoireLine("Line 1", "https://lichess.org/study/embed/TAjrrpST/fLKrg6N9");
    const line2: RepertoireLine = new RepertoireLine("Line 2", "https://lichess.org/study/embed/TAjrrpST/1WyhSAla");

    //add games to lines
    line1.addGame(game1);
    line1.addGame(game2);
    line2.addGame(game2);

    if (openRep != undefined)
    {
      //add lines to rep
      openRep.addLine(line1);
      openRep.addLine(line2);

      openRep.updateLineDisplay();
    }
    //--------------------------- end ----------------------------------
  }
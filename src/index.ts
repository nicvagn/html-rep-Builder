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

// eslint-disable-next-line no-var
export var controller:Controller;



//will be called when the page is loaded init stuff here
document.addEventListener("DOMContentLoaded",  () =>
{
  //the main controller, needed to make button be able to call controller functions
  console.log("loaded");

  controller = new Controller();
  //const rep = controller.getOpenRep();
});

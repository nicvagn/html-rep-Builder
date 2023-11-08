/*************************************************************
 * a typescript chess repertoire builder. including line and example game viewing made for shcc
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
 ************************************************************/
import { ExampleGame } from "./example-game.js";
import { RepertoireLine } from "./repertoire-line.js";
import { Repertoire } from "./repertoire.js";
import { controller } from "./repertoire-controller.mjs";

/**
 * add a line to a repertoire. Class hae methods and functions to help with this
 */
export class AddLine
{
  constructor()
  {
    console.log("AddLine Constructed");
    const windowFeatures = "width=320,height=320,popup";
    window.open("AddLine.html", "mozillaWindow", windowFeatures);
  }
}

/**
 * add a game to a repertoire. Class hae methods and functions to help with this
 */
export class AddGame {

  constructor()
  {
    console.log("AddGame Constructed");
    const windowFeatures = "width=1200, height=800, popup";
    window.open("AddGame.html", "mozillaWindow", windowFeatures);
  }
}

/**
 * a submit function for the popup windows
 */
export function submit(sender:any):boolean
{
  alert("the result from pop " + sender.getAttribute("result"));
  try {
    window.opener.HandlePopupResult(sender.getAttribute("result"));
  }
  catch (err) {}
  window.close();
  return false;
}
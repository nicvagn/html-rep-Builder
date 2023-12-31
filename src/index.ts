/*********************************************************************************
 * version 1.1
 *
 * a typescript chess repertoire builder. including line and example game viewing.
 *
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
import { EditRepertoireController } from "./edit-repertoire-controller.mjs";
import { load } from "./save-control";

/**
 * constants used for setting and getting from local
 */

export const GAMEs = "Example-Games"; // for the saved games
export const LINEs = "Repertoire-Lines"; // for lines
export const REPs = "Repertoires";
export const MAIN = "Repertoire-Builder";


//import our styles, css in ts. We cooking with fire now
import "../css/styles.css";

// eslint-disable-next-line no-var
export var controller:Controller;


//iframe properties for imbedded lichess studies
const iframeHeight: string = 'height="600px"';
const iframeWith: string = 'width="800px"';

//for embedding the iframe
const iframeStart: string = '<iframe id="chessground" ' + iframeWith + ' ' + iframeHeight + " src=";
// url fragment goes here //
const iframeEnd: string = '?theme=blue2&bg=light frameborder=0></iframe>';

/**
 * modes, used for setting different functions for interfaces
 */
// eslint-disable-next-line no-var
var deleteMode:boolean = false;

//will be called when the page is loaded init stuff here
window.onload = () =>
{
  console.log("==== DOM loaded ====");
  //create controller
  controller = new Controller();
  //load save from ls if it exists
  load();
}
/**
 * transform base lichessURL's into something we can embed
 * @param URLInput the raw input url
 * @returns embeddable URL string
 */
export function getEmbeddingStr(URLInput:string): string
{
  const liUrl = "https://lichess.org/study/embed/"

  console.log("getEmbeddingStr: URL input: " + URLInput);

  const emendableURL = liUrl + URLInput.substring(26);

  const emendable:string =  iframeStart + emendableURL + iframeEnd;
  console.log("emendable str: " + emendable)
  return emendable;
}

/**
 * show the Repertoire Builder splash screen.
 */
export function showSplashScreen()
{
  //go to the chessboard view
  Controller.chessBoardView();
  $( "#chessgroundContainer" ).replaceWith(
    ` <div id="chessgroundContainer" >
        <!-- Main Chessboard -->
        <img id="chessground" style="object-fit: contain;" src="images/thinking.jpg" frameborder=0></img>
      </div>`);
}

/**
 * exit delete mode
 */
export function exitDeleteMode(): void
{
  //exit delete mode, set the delete mode bool
  deleteMode=false;
  $( "#nameLabel" ).text("nrv repertoire builder");
  $( "#nameLabel" ).css("background", "#FDD401");
  $( "button" ).css("visibility", "visible");
  $( "label" ).css("visibility", "visible");

}


/**
 * enter a mode where the next deletable thing chosen is deleted
 */
export function enterDeleteMode(): void
{
  deleteMode = true;
  $( "#nameLabel" ).text("delete Mode");
  $( "#nameLabel" ).css("background", "#DD1810");
  $( "#delete-mode" ).css("visibility", "visible" );  //show hidden delete mode btn's
  $( "button:not(.delete-mode)" ).css("visibility", "hidden"); //hide all not delete mode shit
  $( "label" ).css("visibility", "hidden"); //and file-input
  EditRepertoireController.hideEditRepertoire();
}

/**
 * check the delete mode bool
 * @returns deleteMode
 */
export function checkDeleteMode(): boolean
{
  return deleteMode;
}
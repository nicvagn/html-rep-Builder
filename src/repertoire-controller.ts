/* a typescript chess repertoire builder. including line and example game viewing made for shcc
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

//nrv stuff
import { Repertoire } from "./repertoire.js"
import { ExampleGame } from "./example-game.js"
import { RepertoireLine } from "./repertoire-line.js";
import { BoardState } from "./board-state.js"

//other
import { PGN } from "./chess-notation.js";


//if the custom elements are not defined, def. them
if (!customElements.get('example-game')) {
  customElements.define('example-game', ExampleGame, { extends: "button"});
}
if (!customElements.get('rep-line')) {
  customElements.define('rep-line', RepertoireLine, { extends: "button"});
}


//will be called when the page is loaded
document.addEventListener("DOMContentLoaded",  () => {

  console.log("loaded");
  let controller = new Controller();

  controller.boardState.switchFen("");
});

export class Controller {

  openRep: Repertoire;
  boardSpot = document.getElementById('chessground');  //the place to init the chessboard
  public readonly boardState: BoardState;


  //test data
  text_PGN: string = "1. e4 e5 {A surprising move. I did not expect this from my opponent.} 2. Nf3 Nc6 3. Bb5 a6 {Here I was thinking about taking on c6, but eventually decided to preserve my bishop.} 4. Ba4 ({Usually, I play} 4.Bxc6) 4…Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O {etc.}"
  obj_pgn: PGN =  new PGN(this.text_PGN);
  test_game: ExampleGame = new ExampleGame("test game", this.obj_pgn);

  /**
   * data for testing rn
   */
  constructor(_name?: string){

    if(_name != undefined){
      this.openRep = new Repertoire(_name); //the currently open rep
    }
    else
    {
      let _name = prompt("New Repertoire name:");
      this.openRep = new Repertoire(_name!); //the currently open rep
    }

    //create a new board state
    this.boardState = new BoardState(this.boardSpot!);
  }


  /**
   * test function
   */
  public test(){

  }

  /**
   * get currently open repertoire
   * @returns the open rep
   */
  public getOpenRep():Repertoire {

    if(this.openRep != undefined){
      return this.openRep;
    }
    else
    {
      throw Error("no open repertoire.");
    }
  }

  /**
   * make a new repertoire
   * @returns the rep made
   */
  public newRepertoire(name?: string) {

    //the open rep
    let new_rep = new Repertoire("");

    //if no name was given in function call, ask for one
    if (name == undefined) {
      name = prompt("Enter the name you would like to give this Repertoire.")!; //would never be null, right?
    }

    return new_rep;
  }

  /**
   * change the game on the main board to passed ExampleGame
   * @param {ExampleGame} exampleGame example game to change the main board too
   */
  public displayExampleGame(exampleGame:ExampleGame){


  }

  /**
   * show add game popup to add a game to this line
   */
  public showAddGame() {

    const windowFeatures = "width=320,height=320,popup";
    window.open("AddGame.html", "mozillaWindow", windowFeatures);
  }

  /**
   * show the add line popup to add a game to this line
   */
  public showAddLine() {

    const windowFeatures = "width=320,height=320,popup";
    window.open("AddLine.html", "mozillaWindow", windowFeatures);
  }

  /**
   * get text from a popup
   * @param {string} boxType the type of the box
   *
  getTextFromPop(boxType:string) {

    //create variables corresponding to the 2 felids
    let fieldPGN = document.getElementById("PGN");
    let fieldname = document.getElementById("name");

    if(fieldPGN == (null | undefined) or fieldname)


    let pgn:string | null = document.getElementById("PGN").value;
    let name = document.getElementById("name").value;

    if (boxType === "addGame") {
      console.log("add Game");

      //call function to add game
      this.openRep.addGame(name, pgn);

    } else if (boxType === "addLine") {

      console.log("add line");

      //call function to add line
      this.openRep.addLine(name, url);
    } else {

      alert("Unknown box type");
    }

    window.close();
  }
  */
}

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
import { Repertoire } from "./repertoire.js";
import { ExampleGame } from "./example-game.js"
import { RepertoireLine } from "./repertoire-line.js";
import { BoardState } from "./board-state.js"
import { PGN, FEN } from "./chess-notation.js";
import { SaveController } from "./save-controller.js";

//if the custom elements are not defined, def. them
if (!customElements.get('example-game')) {
  customElements.define('example-game', ExampleGame, { extends: "button"});
}
if (!customElements.get('rep-line')) {
  customElements.define('rep-line', RepertoireLine, { extends: "button"});
}

//top navbar buttons
const newBtnTop = document.getElementById("newRepTop");
const openBtnTop = document.getElementById("openRepTop");

/**
 * the main controller , handles repertoire creation, keeps track of open stuff and does the dishes
 */
export class Controller
{
  openRep?: Repertoire;
  openLine?: RepertoireLine;
  public readonly boardState: BoardState;

  boardSpot = document.getElementById("chessground"); //the place to init the chessboard
  repNameElement: HTMLElement = document.getElementById("repName")!;  //for the current rep name

  //test data
  text_PGN: string = "1. e4 e5 {A surprising move. I did not expect this from my opponent.} 2. Nf3 Nc6 3. Bb5 a6 {Here I was thinking about taking on c6, but eventually decided to preserve my bishop.} 4. Ba4 ({Usually, I play} 4.Bxc6) 4…Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O {etc.}";
  obj_pgn: PGN = new PGN(this.text_PGN);
  test_game: ExampleGame = new ExampleGame("test game", this.obj_pgn);

  test_FENS: [FEN, FEN] =  [new FEN("rnbq1rk1/ppp2ppp/3p1n2/4p3/1bP1P3/2N3P1/PP1PNPBP/R1BQK2R b KQ - 1 6 "), new FEN("r2q1rk1/pp2ppbp/1n3np1/3P4/P2P1N2/1QN5/1P3PPP/R1B1K2R b KQ - 2 13")];

  /**
   * construct a new rep with a name maybe
   */
  constructor(name?: string)
  {
    if (name != undefined) {
      this.openRep = new Repertoire(name); //the currently open rep
    } else {
      name = prompt("What would you like to call this repertoire?")!;
    }

    //set the repName element name
    this.setNameElement(name);

    //create a new board state
    this.boardState = new BoardState(this.boardSpot!);

    //add listeners to top buttons

    if(newBtnTop == null){
      throw console.error("new top btn null");
    }
    if(openBtnTop == null){
      throw console.error("open top btn is null");
    }

    //add listeners to the navbar btn
    newBtnTop.addEventListener("click", this.topBtnNew);
    openBtnTop.addEventListener("click", this.topBtnOpen)
  }

  /**
   * set the rep name by asking for user input
   */
  private setNameElement(name: string)
  {
    this.openRep = new Repertoire(name!); //the currently open rep

    //set the name element
    this.repNameElement.innerText = name!;
  }

  /**
   * get the open line, throws error if no open line
   * @returns the open repertoire line
   */
  public getOpenLine(): RepertoireLine
  {
    if (this.openLine != undefined) {
      return this.openLine;
    } else {
      throw Error("no open line.");
    }
  }

  /**
   * get currently open repertoire
   * @returns the open rep
   */
  public getOpenRep(): Repertoire
  {
    if (this.openRep != undefined) {
      return this.openRep;
    } else {
      throw Error("no open repertoire.");
    }
  }

  /**
   * make a new repertoire
   * @returns the rep made
   */
  public async newRepertoire(name?: string)
  {
    //if no name was given in function call, ask for one
    if (name == undefined) {
      name = prompt("Enter the name you would like to give this Repertoire.")!; //would never be null, right?
    }

    //the open rep
    let new_rep = new Repertoire(name);

    return new_rep;
  }

  /**
   * change the game on the main board to passed ExampleGame
   * @param {ExampleGame} exampleGame example game to change the main board too
   */
  public displayExampleGame(exampleGame: ExampleGame)
  {
    //just for testing if I can change the fen
    this.boardState.switchFen(exampleGame.FEN);
  }

  /**
   * show add game popup to add a game to this line
   */
  public showAddGame()
  {
    const windowFeatures = "width=320,height=320,popup";
    window.open("AddGame.html", "mozillaWindow", windowFeatures);
  }

  /**
   * show the add line popup to add a game to this line
   */
  public showAddLine()
  {
    const windowFeatures = "width=320,height=320,popup";
    window.open("AddLine.html", "mozillaWindow", windowFeatures);
  }

  /**
   * the navBar btn listener
   * @param event - the click event that triggered this
   */
  public topBtnOpen(event:Event)
  {
    console.log("top btn open" + event);

    const windowFeatures = "width=320,height=320,popup";
    window.open("AddLine.html", "mozillaWindow", windowFeatures);
  }

  /**
   * the listener for the top new button
   * @param event the click event
   */
  public async topBtnNew(event:Event)
  {
    console.log("top btn new" + event);

    const newRepItems:Array<HTMLElement> = Array.from(
      document.getElementsByClassName("newRep") as HTMLCollectionOf<HTMLElement>,
    );

    newRepItems.forEach(element => {
      element.style.visibility ="visible";
    });


    //if there is an open rep
    if(this.openRep != null && this.openRep != undefined)
    {
      if(confirm("Do you want to save the open repertoire?"))
      {
        //save the rep with the key being it's name
        SaveController.saveRepToLocal(this.openRep.name,this.openRep);
      }
    }

    //make a new rep and assign it to the openRep
    this.openRep = await this.newRepertoire();
  }
}

//the main controller
export const controller:Controller = new Controller("the best");

//will be called when the page is loaded init stuff here
document.addEventListener("DOMContentLoaded",  () =>
{
  console.log("loaded");
});

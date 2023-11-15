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

//nrv stuff
import { Repertoire } from "./repertoire.js";
import { BoardState } from "./board-state.mjs";
import { PGN, FEN } from "./chess-notation.js";
import { SaveController } from "./save-controller.js";
import { EditRepertoireController } from "./edit-repertoire-controller.mjs";

/**
 * the main controller , handles repertoire creation, keeps track of open stuff and does the dishes
 */
export class Controller
{
  openRepName?: string; //name of the open rep
  openRep?: Repertoire; //open rep

  public readonly boardState: BoardState; //the board state, for changing the visual board
  editRepController?: EditRepertoireController; //class containing the functions to aid in editing the rep

  boardSpot = document.getElementById("chessground"); //the place to init the chessboard
  repNameElement: HTMLElement = document.getElementById("repName")!; //for the current rep name

  //test data
  text_PGN: string =
    "1. e4 e5 {A surprising move. I did not expect this from my opponent.} 2. Nf3 Nc6 3. Bb5 a6 {Here I was thinking about taking on c6, but eventually decided to preserve my bishop.} 4. Ba4 ({Usually, I play} 4.Bxc6) 4…Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O {etc.}";
  obj_pgn: PGN = new PGN(this.text_PGN);
  test_FENS: [FEN, FEN] = [
    new FEN(
      "rnbq1rk1/ppp2ppp/3p1n2/4p3/1bP1P3/2N3P1/PP1PNPBP/R1BQK2R b KQ - 1 6 "
    ),
    new FEN(
      "r2q1rk1/pp2ppbp/1n3np1/3P4/P2P1N2/1QN5/1P3PPP/R1B1K2R b KQ - 2 13"
    ),
  ];


  /**
   * construct a new rep with a name maybe
   */
  constructor()
  {
    //create a new board state
    this.boardState = new BoardState(this.boardSpot!);

    //add event handlers to top btn's
    $( "#newRepTop" ).on("click", { controller: this }, function (event)
    {
      console.log(event);

      //make new rep
      event.data.controller.newRepertoire();
      //show the edit stuff
      event.data.controller.editRepertoire();
    });

    $( "#openRepTop" ).on("click", { controller: this }, function (event)
      {
        console.log("top btn open " + event);

        const windowFeatures = "width=320,height=320,popup";
        //open openRepWindow
        window.open("AddLine.html", "mozillaWindow", windowFeatures);
      });

    $( "#editRepTop" ).on("click", { controller: this }, function (event)
      {
        console.log("top btn edit " + event);

        //show all the controls for editing
        event.data.controller.editRepertoire();
      });

    //add event handlers to forward an back btn's
    $( "#boardCtrlBack" ).on("click", { boardState:this.boardState }, function (event)
      {
        event.data.boardState.undoMove()
      });
  }

  /**
   * set the rep name by asking for user input
   */
  public setNameElement(name: string): void
  {
    console.log("set name element entered with name: " + name)
    //set the name element
    this.repNameElement.innerText = name;
  }

  /**
   * get currently open repertoire
   * @returns the open rep
   */
  public getOpenRep(): Repertoire
  {
    if (this.openRep != undefined)
    {
      return this.openRep;
    } else
    {
      throw Error("no open repertoire.");
    }
  }

  /**
   * make a new repertoire, promoting the user for it's name if not provided.
   * and displaying all the controls for making one. And set it as the open rep
   * and return it
   * @returns a new rep
   */
  public newRepertoire(name?:string): Repertoire
  {

    //empty the line display on the dom
    $("#lineList").replaceWith("<div id='lineList'> </div>");

    console.log("newRepertoire entered with name: " + name)
    //if there is an open rep
    if (this.openRep != null && this.openRep != undefined)
    {
      if (confirm("Do you want to save the open repertoire to browser storage?"))
      {
        //save the rep with the key being it's name
        if(this.openRep.name != undefined)
        {
          SaveController.saveRepToLocal(this.openRep.name, this.openRep);
          console.log("Rep saved");
        }
        else
        {
          throw new Error("newRepertoire: this.openRep.name undefined");
        }
      }
    }

    if(name != undefined)
    {
      this.openRep = new Repertoire(name);
      this.openRepName = name;
      this.setNameElement(this.openRepName);
    }
    else
    {
      //make a new rep. will ask for a name
      this.openRep = new Repertoire();
    }

    //show the editing stuff
    this.editRepertoire();
    return this.openRep;
  }

  /**
   * create an edit controller, and display all the controls for editing a rep
   */
  public editRepertoire(): void
  {
    if(this.editRepController == undefined || this.editRepController == null)
    {
      this.editRepController = new EditRepertoireController();
    }

    //get all the edit repertoire buttons
    const newRepItems: Array<HTMLElement> = Array.from(
      document.getElementsByClassName("editRep") as HTMLCollectionOf<HTMLElement>
    );

    //make them visible
    newRepItems.forEach((element) => {
      element.style.visibility = "visible";
    });
  }

  /**
   * change the game on the main board
   * FEN { FEN } fen to display on the board
   */
  public changeExampleGame(fen: FEN): void
  {
    console.log("changeExampleGame() entered, with FEN " + fen);
    //just for testing if I can change the fen
    this.boardState.switchFen(fen);
  }
}


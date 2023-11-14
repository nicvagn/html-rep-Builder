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
import { ExampleGame } from "./example-game.js";
import { RepertoireLine } from "./repertoire-line.js";
import { BoardState } from "./board-state.js";
import { PGN, FEN } from "./chess-notation.js";
import { SaveController } from "./save-controller.js";
import { EditRepertoireController } from "./edit-repertoire-controller.mjs";


//top navbar buttons
const newBtnTop = document.getElementById("newRepTop");
const openBtnTop = document.getElementById("openRepTop");
const editBtnTop = document.getElementById("editRepTop");

const docLineList = document.getElementById("lineList");
const docGameList = document.getElementById("gameList");

/**
 * the main controller , handles repertoire creation, keeps track of open stuff and does the dishes
 */
export class Controller
{
  openRepName?: string; //name of the open rep
  openRep?: Repertoire; //open rep
  openLine?: RepertoireLine; //open line

  gameList: Array<ExampleGame> = []; //example games for the current line
  lineList: Array<RepertoireLine> = [];  //list of lines in open repertoire

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

    //ensure top buttons are not null
    if (newBtnTop == null) {
      throw Error("new top btn null");
    }
    if (openBtnTop == null) {
      throw Error("open top btn is null");
    }
    if (editBtnTop == null) {
      throw Error("open top btn is null");
    }
    //ensure the document div's for the list's are not null
    if (docGameList == null) {
      throw Error("docGameList is null");
    }
    if (docLineList == null) {
      throw Error("docLineList is null");
    }

    //add listeners to the navbar btn
    newBtnTop.addEventListener("click", this.topBtnNew);
    editBtnTop.addEventListener("click", this.topBtnEdit);
    openBtnTop.addEventListener("click", this.topBtnOpen);
  }

  /**
   * Initialize repertoire controller after construction,
   * needed because a fully constructed controller is needed
   */
  public init(): void
  {
    let exGames:Array<ExampleGame> = [];

    //game list test data
    let test_game = new ExampleGame("electric bugaboo", this.obj_pgn, new FEN("rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"));
    exGames.push(test_game);
    let test_game1 = new ExampleGame("electric bugaboo: the sequel", this.obj_pgn, new FEN("rnbqkbnr/ppp1pppp/3p4/8/5P2/6P1/PPPPP2P/RNBQKBNR b KQkq - 0 2"));
    exGames.push(test_game1);
    let test_game2 = new ExampleGame("fun times", this.obj_pgn, new FEN("rnb1kbnr/pp2pppp/3p4/q1p5/2P2P2/6P1/PP1PP2P/RNBQKBNR w KQkq - 1 4"));
    exGames.push(test_game2);

    //lie list test data
    let test_line1 = new RepertoireLine("Kings underwear");

    test_line1.exampleGames = exGames;

    test_line1.addGame(test_game);
    test_line1.addGame(test_game1);
    test_line1.addGame(test_game2);

    this.lineList.push(test_line1);
    this.setOpenLine(test_line1);
  }

  /**
   * display the lines on the DOM
   */
  public updateLineDisplay(): void
  {
    console.log("updateLineDisplay() entered");
    console.log("Line List:" + this.lineList);

    //for each game append to the game list spot
    this.lineList.forEach((line) => {
      console.log("line:" + line.name + "lineBtn:" + line.lineBtn);
      line.lineBtn.appendTo(docLineList!);
    });
  }

  /**
   * display array gameList in html page
   */
  public updateGameDisplay(): void
  {
    console.log("updateGameDisplay entered");

    if(controller.gameList != undefined)
    {
      controller.gameList = controller.openLine?.exampleGames!;
      console.log("Game List:" + controller.gameList);

      //for each game append to the game list spot
      controller.gameList.forEach((game) => {
        console.log("game:" + game.name + "gameBtn:" + game.gameBtn);
        game.gameBtn.appendTo(docGameList!);
      });
    }
    else
    {
      console.error("controller.gameList is undefined");
      console.log(controller);
    }
  }

  /**
   * set the rep name by asking for user input
   */
  private setNameElement(name: string): void
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
   * open a RepLine line and corresponding game list
   * @param line Line to open
   */
  public setOpenLine(line:RepertoireLine): void
  {
    controller.openLine = line;
    controller.gameList = line.exampleGames;
    controller.updateLineDisplay();
    controller.updateGameDisplay();
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
   * make a new repertoire, promoting the user for it's name
   * and displaying all the controls for making one
   */
  public newRepertoire(): void
  {
    //if there is an open rep
    if (this.openRep != null && this.openRep != undefined) {
      if (
        confirm("Do you want to save the open repertoire to browser storage?")
      ) {
        //save the rep with the key being it's name
        SaveController.saveRepToLocal(this.openRep.name, this.openRep);
        console.log("Rep saved");
      }
    }

    this.openRepName = prompt("New rep name?")!;
    //set the open rep name
    this.setNameElement(this.openRepName);

    //make a new rep
    this.openRep = new Repertoire(this.openRepName);

    //show the editing stuff
    this.editRepertoire();
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
    console.log("changeExampleGame() entered, with FEN " + fen.stringFEN);
    //just for testing if I can change the fen
    this.boardState.switchFen(fen);
  }

  /**
   * the navBar btn listener
   * @param event - the click event that triggered this
   */
  public topBtnOpen(event: Event): void
  {
    console.log("top btn open" + event);

    const windowFeatures = "width=320,height=320,popup";
    window.open("AddLine.html", "mozillaWindow", windowFeatures);
  }

  /**
   * the listener for the top new button
   * @param event the click event
   */
  public async topBtnNew(event: Event)
  {
    console.log(event);
    //show the edit stuff
    controller.editRepertoire();
    //  todo: make this make a new rep
  }

  /**
   * the listener for the top edit button
   * @param event the click event
   */
  public async topBtnEdit(event: Event)
  {
    console.log(event);

    console.log("topBtn edit lnr");

    //show all the controls for editing
    controller.editRepertoire();
  }
}

//the main controller, needed to make button be able to call controller functions
export const controller:Controller = new Controller("the best");

//will be called when the page is loaded init stuff here
document.addEventListener("DOMContentLoaded",  () =>
{
  console.log("loaded");

  controller.init();
  controller.updateLineDisplay();
});

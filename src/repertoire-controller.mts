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
import { EditRepertoireController } from "./edit-repertoire-controller.mjs";
import { RepertoireLine } from "./repertoire-line.js";
import { ExampleGame } from "./example-game.js";
import { getEmbeddingStr, controller } from "./index.js";
import { save, download } from "./save-control.js";

//other stuff
import { error } from "jquery";


/**
 * the main controller , handles repertoire creation, keeps track of open stuff and does the dishes
 */
export class Controller
{
  openRepName?: string; //name of the open rep
  openRep?: Repertoire; //open rep
  repList: Repertoire[] = new Array<Repertoire>() ;  //list of reps

  boardSpot?: JQuery<HTMLElement>;
  localReps: JQuery<HTMLElement> = $( "#localReps" );

  editRepController: EditRepertoireController; //class containing the functions to aid in editing the rep
  /**
   * construct a new repertoire controller
   */
  constructor()
  {
    //construct controllers
    this.editRepController = new EditRepertoireController();

    this.boardSpot = $( "#chessground" ); //the place to init the chessboard
    //add event handlers to top btn's
    $( "#newRepTop" ).on("click", () =>
    {
      //make new rep
      EditRepertoireController.showNewRepPane();
    });

    $( "#editRepTop" ).on("click", () =>
    {
      //show all the controls for editing
      Controller.editRepertoire();
    });

    $( "#saveBrowser" ).on("click", () =>
    {
      console.log("save to browser initialized.");
      save(); //save to local storage
    });

    $( "#download" ).on("click",  ( ) =>
    {
      //download the repertoires
      download();
    });

    if ( this.boardSpot == null )
    {
      throw error("ERROR: ============= boardSpot is null ======================");
    }
  }

  /**
   * reset back to chessboard view
   */
  public static chessBoardView(): void
  {
    //make side panels visible
    this.showColumns();
    $( ".chessBoardView" ).css("visibility", "visible");
    //reset the center pane
    $( "#centerPane" ).replaceWith(EditRepertoireController.chessBoardEmbed);

    const openRepName = controller.openRep?.name;
    if( openRepName ) //if open rep name is a value != false
    {
      Controller.setNameElement( openRepName );
    }
  }

  /**
   * hide the ChessBoardView this consists of the main board pane and side columns
   */
  public static hideChessBoardView(): void
  {
    //hide all elements with class chessboard view
    $( ".chessBoardView" ).css("visibility", "hidden");
    //hide the side columns
    this.hideColumns();
  }

  /**
   * hide columns
   */
  public static hideColumns(): void
  {
    //hide lines and rep buttons columns
    $( ".column" ).css("display", "none");
  }

  public static showColumns(): void
  {
    //hide lines and rep buttons
    $( ".column" ).css("display", "block");
  }


  /**
   * load a list of repertoires into this controller
   * @param givenRepList the repertoires that are saved
   */
  public loadRepList( givenRepList: Repertoire[] ): void
  {
    givenRepList.forEach( givenRep =>
      {
        controller.addRepertoire( givenRep );
      });
  }

  /**
   * add a repertoire to this controller
   * this means add it to the local rep list
   */
  public addRepertoire( rep: Repertoire ): void
  {
    //add repertoire button to the local rep's list
    this.localReps.append( rep.repertoireBtn );

    //add rep to our rep list
    this.repList.push( rep );
  }

  /**
   * set the name element
   */
  public static setNameElement(name: string): void
  {
    console.log("set name element entered with name: " + name)
    //set the name element
    const nameEl = $( "#nameLabel" )[0];
    if( nameEl )
    {
      nameEl.innerText = name;
    }
    else
    {
      error("nameElement can not be found.")
    }

    console.log("nameLabel innerText " + nameEl.innerText);
  }

  /**
   * get currently open repertoire, throws error if no open rep
   * @returns the open rep
   */
  public getOpenRep(): Repertoire
  {
    if (this.openRep != undefined)
    {
      return this.openRep;
    } else {
      window.alert("No open repertoire to get.")
      throw Error("no open repertoire.");
    }
  }

  /**
   * open a repertoire
   * @param rep the repertoire to load
   */
  public openRepertoire(rep: Repertoire): void
  {
    controller.openRep = rep;

    $( ".openRepNeeded" ).css("visibility", "visible"); // make controls that need an open rep visible

    console.log("opened repertoire.");

    //update the sep list's on the DOM
    controller.openRep.select();
  }

  /**
   * reset the line ang game lists to the ones in the open repertoire
   */
  public updateOpenRepLists(): void
  {
    //refresh the game display
    this.openRep?.currentOpenLine.refreshGameDisplay();

    this.openRep?.updateLineDisplay();
  }

  /**
   * update list of repertoires we can access.
   */
  public updateRepList(): void
  {
    //clear the rep list
    this.localReps.html('<div id="localReps"></div>');
    for(let x = 0; x < this.repList.length; x++)
    {
      const rep = this.repList[x];
      console.log(rep.name + " added.");
      this.localReps.append(rep.repertoireBtn);
      //add the listener
      //rep.repertoireBtn.on("click", () => { alert("fuck me")});
    }
  }

  /**
   * make a new repertoire, with no user input and do not set it as the open rep
   * or clear the lines
   * @returns a new rep
   */
  public newRepertoire(name:string, studyURL: string): Repertoire
  {
    console.log("newRepertoire entered with name: " + name);
    const newRep = new Repertoire(name, studyURL);

    controller.addRepertoire(newRep);

    return newRep;
  }


  /**
   * display all the controls for editing a rep
   */
  public static editRepertoire(): void
  {
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
   * change the study on the main board to a provided chess thing's study
   * @param chessThing the chessThing with a .studyURL to add to the main board
   */
  public static changeStudy(chessThing: RepertoireLine | ExampleGame ): void
  {

    console.log("changeStudy() entered, with study: " + chessThing.name +
    "and study url: [" +  chessThing.studyURL + "]" );

    const imbeddingStr = getEmbeddingStr(chessThing.studyURL)
    console.log("impeded str: " + imbeddingStr + " was the impeding str");
    //set the name element
    if(chessThing.name == null)
    {
      throw error("chessThing.name is null.")
    }
    else
    {
      Controller.setNameElement(chessThing.name);
    }

    //change out dom stuff
    $( "#chessgroundContainer" ).empty();
    $( "#chessgroundContainer" ).append( $( imbeddingStr ) );
    //$( "#chessgroundContainer" ).replaceWith( $( imbeddingStr ) ); for some reason, this does not work
  }

  public toString(): string
  {
    let controllerStr = "controller toString()";
    for(let x = 0; x < this.repList.length; x++)
    {
      controllerStr += this.repList[x];
    }

    return controllerStr;
  }
}
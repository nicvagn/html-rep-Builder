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
import { EditRepertoireController, chessBoardView } from "./edit-repertoire-controller.mjs";
import { getFromLocal, save} from "./save-controller.js";
import { RepertoireLine } from "./repertoire-line.js";
import { ExampleGame } from "./example-game.js";
import { error } from "jquery";

import { controller, getEmbeddingStr } from "./index.js";

const newRepertoirePane =
`
<div id="newRepControls">
  <div id="URLInstructions" style="margin: 15px auto;" >
    <h3 style="margin: 3px auto;">The studies current chapter URL is what is needed. It can be found under at
      lichess.org/studies/... here: </h3>
    <br>
    <img style="margin: 15px auto;" src="./images/url_location.png">
  </div>

  <h2>Repertoire Creation</h2>
  <br>
  <label style="text-align: left" for="repertoireName"> Repertoire  Name: </label>
  <input type="text" id="repertoireName" name="repertoireName">
  <br>
  <label style="text-align: left" for="repertoireURL">Main chapter URL: </label>
  <input type="text"  id="repertoireURL" name="repertoireURL">
  <br>
  <button id="newRepControlSubmit"> submit </button>
</div>
`



/**
 * the main controller , handles repertoire creation, keeps track of open stuff and does the dishes
 */
export class Controller
{
  openRepName?: string; //name of the open rep
  openRep?: Repertoire; //open rep
  repList: Repertoire[] = new Array<Repertoire>();  //list of reps

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

    //get any saved reps from storage and add them to local reps

    const stringifiedReps = getFromLocal("repertoires");

    //if there are saved reps, get them
    if(stringifiedReps != null)
    {
      this.repList = JSON.parse(stringifiedReps);
      console.log("Reps gotten from local storage " + this.repList)
    }

    this.boardSpot = $( "#chessground" ); //the place to init the chessboard
    //add event handlers to top btn's
    $("#newRepTop").on("click", { controller: this }, function (event)
    {
      //make new rep
      event.data.controller.showNewRepPane();
    });

    $("#editRepTop").on("click", { controller: this }, function (event)
    {
      //show all the controls for editing
      event.data.controller.editRepertoire();
    });

    $( "#saveBrowser" ).on("click", () =>
    {
      console.log("save to browser initialized.");
      save();
    });

    if (this.boardSpot == null)
    {
      throw error("ERROR: ============= boardSpot is null ======================");
    }
    else
    {
      console.log("Board spot: " + this.boardSpot);
    }
  }

  /**
   * add a repertoire to this controller
   * this means add it to the local rep list
   */
  private addRepertoire(rep: Repertoire): void
  {
    //add repertoire button to the local rep's list
    this.localReps.append(rep.repertoireBtn);
    //add rep to our rep list
    this.repList.push(rep);
  }

  /**
   * set the name element
   */
  public setNameElement(name: string): void
  {
    console.log("set name element entered with name: " + name)
    //set the name element
    const nameEl = $("#nameLabel")[0];
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
   */
  public openRepertoire(rep: Repertoire): void
  {
    controller.openRep = rep;

    $( ".openRepNeeded" ).css("visibility", "visible"); // make controls that need an open rep visible

    console.log("```````````````` open Repertoire entered ````````````````````````````");
    //change the default study to the rep. starting one
    controller.changeStudy(rep);

    // clear the line and instructive games displays
    rep.open();
  }

  /**
   * reset the line ang game lists to the ones in the open repertoire
   */
  public updateLists(): void
  {
    //refresh the game display
    this.openRep?.getOpenLine().refreshGameDisplay();

    this.openRep?.updateLineDisplay();
  }

  /**
   * set up the new repertoire controls and center pane
   */
  public showNewRepPane(): void
  {
    $( "#centerPane" ).html(newRepertoirePane);
    $( "#newRepControlSubmit" ).on("click", () => {
      const studyURLInput:HTMLInputElement | null = document.getElementById( "repertoireURL" ) as HTMLInputElement;
      const studyNameInput:HTMLInputElement | null = document.getElementById( "repertoireName" ) as HTMLInputElement;

      //get the value of the input felids
      const name = studyNameInput.value;
      const url = studyURLInput.value;

      if(name == null)
      {
        alert("Name can not be null.");
      }
      if(url == null)
      {
        alert("url can not be null.");
      }

      chessBoardView();
      if(name != null && url != null)
      {
        const newRep = this.newRepertoire(name, url);
        //open the new rep
        this.openRepertoire(newRep);
        console.log("created a new rep with name: " + newRep.name);
      }
      else
      {
        throw error(" if(name != null && url != null) did not pass")
      }
    });
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

    this.addRepertoire(newRep);


    return newRep;
  }


  /**
   * display all the controls for editing a rep
   */
  public editRepertoire(): void
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
   */
  public changeStudy(chessThing: RepertoireLine | ExampleGame | Repertoire): void
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
      this.setNameElement(chessThing.name);
    }

    $( "#chessgroundContainer" ).empty();
    $( "#chessgroundContainer" ).append( $( imbeddingStr ) );
  }

  /**
   * get an JSON.stringify() of the info to save
   * @returns the json stringified ready for storage locally
   */
    private getSaveData(): string
    {
      //todo this
      return "";
    }

}
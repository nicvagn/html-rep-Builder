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
//import { SaveController } from "./save-controller.js";
import { EditRepertoireController, chessBoardView } from "./edit-repertoire-controller.mjs";
import { RepertoireLine } from "./repertoire-line.js";
import { ExampleGame } from "./example-game.js";
import { error } from "jquery";

import { controller } from "./index.js";

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

  //iframe properties for imbedded lichess studies
  iframeHeight: string = 'height="600px"';
  iframeWith: string = 'width="800px"';

  //for embedding the iframe
  iframeStart: string = ('<iframe id="chessground" ' + this.iframeWith + ' ' + this.iframeHeight + " src=");
  // url fragment goes here
  iframeEnd: string = '?theme=blue2&bg=light frameborder=0></iframe>';
  editRepController: EditRepertoireController; //class containing the functions to aid in editing the rep

  /**
   * construct a new repertoire controller
   */
  constructor()
  {
    //construct an edit controller
    this.editRepController = new EditRepertoireController();

    this.boardSpot = $( "#chessground" ); //the place to init the chessboard
    //add event handlers to top btn's
    $("#newRepTop").on("click", { controller: this }, function (event)
    {
      console.log("newRepTop clicked");

      //make new rep
      event.data.controller.showNewRepPane();
    });

    $("#editRepTop").on("click", { controller: this }, function (event)
    {
      console.log("top btn edit " + event);

      //show all the controls for editing
      event.data.controller.editRepertoire();
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
   * get currently open repertoire
   * @returns the open rep
   */
  public getOpenRep(): Repertoire
  {
    if (this.openRep != undefined)
    {
      return this.openRep;
    } else {
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
    this.resetLists();

    rep.open();
  }

  /**
   * reset the line ang game lists
   */
  public resetLists(): void
  {
    $( "#lineList" ).replaceWith("<div id='lineList'> </div>");
    $( "#gameList" ).replaceWith("<div id='gameList'> </div>");
  }

  /**
   * make a new repertoire, promoting the user for it's name if not provided.
   * and displaying all the controls for making one. And set it as the open rep
   * and return it
   * @returns a new rep
   *
  public newRepertoireUser(name?:string, save?: boolean): Repertoire
  {

    //empty the line display on the dom
    this.resetLists();

    console.log("newRepertoire entered with name: " + name)
    //if there is an open rep
    if (save && this.openRep != undefined)
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

    //add the rep to our list of reps
    this.addRepertoire(this.openRep);

    //show the editing stuff
    this.editRepertoire();
    return this.openRep;
  }*/

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
        const newRep = this.newRepertoireSystem(name, url);
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
  public newRepertoireSystem(name:string, studyURL: string): Repertoire
  {

    console.log("newRepertoireSystem entered with name: " + name);
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
    "and study url: [" +  chessThing.studyUrl + "]" );


    const imbeddingStr:string =  this.iframeStart + chessThing.studyUrl + this.iframeEnd;

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
}
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

import { error } from "jquery";
import { ExampleGame } from "./example-game.js";
import { controller, showSplashScreen, enterDeleteMode, exitDeleteMode, checkDeleteMode } from "./index.js";
import { RepertoireLine } from "./repertoire-line.js";
import { loadFromFile } from "./save-controller.js";
import { Repertoire } from "./repertoire.js";
import { Controller } from "./repertoire-controller.mjs";

//get the various NewRepertoire buttons
const deleteModeBtn = document.getElementById("deleteMode");
const addStudyBtn = document.getElementById("addStudy");
const createStudyBtn = document.getElementById("createStudy");

const fileInput = $("#fileInput"); //for ease of coding



/**
 * helper for creating new reps
 */
export class EditRepertoireController
{
  /**
   * html for dom manipulation
   */
  static readonly addStudyEmbed =
  `<div id="centerPane" class="centerPane">
    <div id="addStudyEmbed">

      <div id="URLInstructions" style="margin: 15px auto;" >
          <h3 style="margin: 3px auto;">The current chapter URL is what is needed. It can be found under at
            lichess.org/studies/... here: </h3>
          <br>
          <img style="margin: 15px auto;" src="./images/url_location.png">
      </div>

      <div>
        <span class="inputSpan">

          <h1>Line:</h1>
          <!-- game/line switch -->
          <label class="switch">
            <input type="checkbox" id="lineToggle">
            <span class="slider"></span>
          </label>

          <label for="studyTextField">Lichess study chapter url: </label>
          <input type="text" id="studyTextField" name="studyTextField">
          <button id="addURL" style="width: 35px;">Add</button>
          <button id="done" style="width: 35px;"></button>
        </span>
      </div>
    </div>
  </div>`

  static readonly chessBoardEmbed =
  `<div id="centerPane" class="centerPane">

    <div id="chessgroundContainer" >
      <!-- Main Chessboard -->
      <img id="chessground" style="object-fit: contain;" src="images/thinking.jpg" frameborder=0></img>
    </div>
  </div>`

  static readonly newRepertoirePane =
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

  static readonly LinesToAddGameEmbed =
  `<div id="centerPane" class="centerPane">
    <h2 style='margin: 15px 0; text-align: center;'>  Line options: </h2>
  </div>`

  static readonly repsToAddLineToEmbed =
  `<div id="centerPane" class="centerPane">
    <h2 style='margin: 15px 0; text-align: center;'> Repertoire options: </h2>
  </div> `

  constructor()
  {
    console.log("EditRepertoireController constructed");
    //add listeners
    deleteModeBtn?.addEventListener("click", EditRepertoireController.buttonLnr);
    addStudyBtn?.addEventListener("click", EditRepertoireController.buttonLnr)
    createStudyBtn?.addEventListener("click", EditRepertoireController.buttonLnr);

    //file input listener
    fileInput.on("cancel", () => {
      console.log("File Input canceled.");
    });
    fileInput.on("change", EditRepertoireController.fileInputLnr);
  }

  /**
   * set up the new repertoire controls and center pane
   */
  public static showNewRepPane(): void
  {
    $( "#centerPane" ).html(EditRepertoireController.newRepertoirePane);
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

      Controller.chessBoardView();
      if(name != null && url != null)
      {
        const newRep = controller.newRepertoire(name, url);
        //open the new rep
        controller.openRepertoire(newRep);
        console.log("created a new rep with name: " + newRep.name);
      }
      else
      {
        throw error(" if(name != null && url != null) did not pass")
      }
    });
  }

  /**
   * open lichess study creation
   */
  public static createStudy():void
  {
    //open the lichess study page
    window.open("https://lichess.org/study");
    //the rest has to be handled by the user
  }

  /**
   * delete thing
   * @param thing
   */
  public static delete(thing: RepertoireLine | ExampleGame | Repertoire): void
  {
    console.log("delete mode entered with thing: " + thing);
    const openRep = controller.getOpenRep(); // get open rep
    if(thing instanceof Repertoire)
    {
      //if we are deleting the open rep list
      if(thing == openRep)
      {
        //show the splash screen
        showSplashScreen();
      }
      const newRepList = new Array<Repertoire>();
      //go through rep list and copy all but our thing
      controller.repList.forEach(rep => {
        console.log("thing == rep: " + (thing == rep));
        if(rep !== thing)
        {
          newRepList.push(rep);
        }
      });
      //delete all the lines and games
      thing.lineList.forEach(line => {
        this.delete(line);
      });
      controller.repList = newRepList;
      console.log("new rep list: " + newRepList)
      controller.updateRepList();
    }
    else if( thing instanceof RepertoireLine )
    {
      const newLineList = new Array<RepertoireLine>();
      const lineList = openRep.lineList;

      lineList.forEach(line => {
        if( line !== thing )
        {
          newLineList.push(line);
        }
        else
        {
          //delete the example games for this line
          line.exampleGames.forEach( game => {
            this.delete(game);
          });
        }
      });
      openRep.lineList = newLineList;
      openRep.updateLineDisplay();
    }
    else if( thing instanceof ExampleGame )
    {
      const games = openRep.openLine.getGames();
      const newGames = new Array<ExampleGame>();

      games.forEach( game => {
        if( game !== thing )
        {
          newGames.push(game);
        }
      });
      openRep.openLine.refreshGameDisplay();
    }
    else
    {
      exitDeleteMode();
      throw error("delete(thing): thing wae not Repertoire, RepertoireLine or ExampleGame: typeOf thing:" + typeof thing);
    }

    //turn off delete mode
    exitDeleteMode();
  }


  /**
   * listener for the fileInput input elem
   */
  public static fileInputLnr(): void
  {
    if(fileInput.prop("files").length == 1)
    {
      loadFromFile(fileInput.prop("files")[0]);
    }
    else
    {
      alert("Exactly one file must be loaded. Nothing was done.")
    }
  }

  /**
   * the listener for the addGame and addLine buttons
   * @param event the event that triggered
   */
  public static buttonLnr(event: Event):void
  {
    if(event.target == deleteModeBtn)
    {
      console.log("delete mode games btn: DeleteMode toggled");
      //enter delete mode
      if( checkDeleteMode() )//if delete mode is on, turn it off
      {
        exitDeleteMode();
      }
      else //turn it on
      {
        enterDeleteMode();
      }
    }
    else if(event.target == addStudyBtn)
    {
      console.log("study input clicked");
      EditRepertoireController.showAddStudy();
    }
    else if(event.target == createStudyBtn)
    {
      console.log("createStudyBtn clicked");
      EditRepertoireController.createStudy();
    }
    else
    {
      throw error("event target was: " + event.target + " this is not one of the buttons.");
    }
  }



  /**
   * make all the edit repertoire controls hidden
   */
  public static hideEditRepertoire(): void
  {
    console.log("edit rep controls should be hidden");
    console.log(".editRep class stuff " + $( ".editRep" ));
    //hide the edit rep controls
    $( ".editRep" ).css("visibility", "hidden");

    //if delete mode is on, don't hide the toggle
    if( checkDeleteMode() )
    {
      $( "#deleteMode" ).css("visibility", "visible");
    }
  }

  /**
   * show the lines you can add an example game to
   * @param game example game to add on click
   */
  public static showLinesToAddGameTo(game: ExampleGame): void
  {
    console.log("showLinesToAddGameTo entered with a game named: " + game.name);
    //hide the edit rep controls
    this.hideEditRepertoire();
    const openRep = controller.openRep;
    if(openRep == null)
    {
      throw error("No open rep to add this game to")
    }

    //set up the center pane
    $( "#centerPane" ).replaceWith(this.LinesToAddGameEmbed)

    //if there are no lines
    if(openRep.lineList == null || openRep.lineList.length == 0)
    {
      alert("you have to have a line to add a game to.");
    }
    else
    {
      for(let x = 0; x < openRep.lineList.length; x++)
      {
        //create a button with each of the line names
        const btn = $("<button/>",
        {
          text: openRep.lineList[x].name,
        });

        //attach event handler to the game. Event handler adds game to line
        btn.on( "click", {  line: openRep.lineList[x] },( event ) =>
        {
          const line = event.data.line;

          //when the button is pressed, ad the game to the chosen line
          console.log("line chosen to add game to: " + line.name)
          line.addGame(game);

          //return to the chessboard view with that game opened
          Controller.chessBoardView();

          game.showGame(); //display the game on the main board
          controller.updateOpenRepLists();
        });

        $(btn).css(
          {
            "margin": "0 auto",
            "min-width": "450px",
            "width": "fit-content",
            "hight": "45px"
          });

        $( "#centerPane" ).append(btn);
      }
    }
  }

  /**
   * display a list of repertoires repButtons that you can add line to
   * @param line the line to add to the chosen rep
   */
  public static showRepsToAddLineTo(line: RepertoireLine): void
  {
    //hide the edit rep controls
    this.hideEditRepertoire();

    $( "#centerPane" ).html(this.repsToAddLineToEmbed);
    console.log( $( "#centerPane" ).css );
    for(let x = 0; x < controller.repList.length; x++)
    {
      //create a button with each of the rep names
      const btn = $("<button/>",
      {
        text: controller.repList[x].name,
        //add a lister to add the line to that rep
      });

      //attach event handler to the game. Event handler adds game to line
      btn.on( "click", {  rep:controller.repList[x] },( event ) =>
      {
        const rep = event.data.rep;
        //when the button is pressed, ad the line to the chosen rep
        console.log("rep chosen to add line to: " + rep.name);
        rep.addLine(line);

        //return to the chessboard view with that game opened
        Controller.chessBoardView();

        Controller.changeStudy(line); //display the game on the main board

        controller.updateOpenRepLists();
      });

      $(btn).css(
        {
          "margin": "0 auto",
          "min-width": "450px",
          "width": "fit-content",
          "hight": "45px"
        });

      $( "#centerPane" ).append(btn);
    }
  }

  /**
   * add the listeners to the add study buttons, etc
   */
  public static setAddStudyListeners(): void
  {
    console.log("setting addStudy listeners");

    const addUrlBtn = $( "#addURL" );

    if(addUrlBtn == null)
    {
      throw error("addUrlBtn in null");
    }

    //add lister to the addURL button
    addUrlBtn.on("click", () =>
    {
      //hide instructions
      $( "#URLInstructions" ).css("display", "none");

      //get study url
      const studyURLInput:HTMLInputElement| null = document.getElementById( "studyTextField" ) as HTMLInputElement;

      if(studyURLInput == null)
      {
        throw error("studyURLInput is null");
      }

      //get the embedding URL for given input
      const studyURL = studyURLInput.value;

      const isLine = document.getElementById("lineToggle") as HTMLInputElement;
      console.log("is the line toggle checked? (if it exists, true): " + isLine.checked);


    if(typeof studyURL === "string" && studyURL != null) // if url is typeof string
    {
      console.log("the given url: " + studyURL);
      if(isLine.checked) //if is line is checked. Is a line
      {
        console.log("addURL clicked with a line url");
        $( "#URLInstructions" ).css("display", "none"); //hide instructions

        let lineName: string | null;
        do{
          lineName = prompt("What do you want to call this line?");
        } while(lineName == null) //do not let the lineName be null
        //construct line
        const line = new RepertoireLine(lineName, studyURL);

        this.showRepsToAddLineTo(line);
      }
      else  // must be a game
      {
        console.log("addURL pressed with a gameURL");
        $( "#URLInstructions" ).css("display", "none");

        let gameName: string | null;
        //ask user what to call this game
        do{
          gameName = prompt("What do you want to call this game?");
        } while(gameName == null) //do not let the gameName be null

        const game = new ExampleGame(gameName, studyURL);

        //what line should we add this to?
        this.showLinesToAddGameTo(game);
        //now, we wait for the uses to click a line then update the lists
        controller.updateOpenRepLists();
        }
      }
    });

    //when done is clicked return to the chessboard view
    $( "#done" ).on("click", () =>
    {
      Controller.chessBoardView();
    });
  }

  /**
   * prepare the embed
   */
  public static showAddStudy(): void
  {
    console.log("show add study entered");

    //hide the edit rep controls and side columns
    this.hideEditRepertoire();
    Controller.hideColumns();

    //replace center html with the study input controls
    $( "#centerPane" ).replaceWith(this.addStudyEmbed);

    //hide chessboard view
    $( ".chessboardView" ).css("visibility", "hidden");

    //add listeners to new content
    this.setAddStudyListeners();
  }
}


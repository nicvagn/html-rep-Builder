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
import { controller, showSplashScreen } from "./index.js";
import { RepertoireLine } from "./repertoire-line.js";
import { loadFromFile } from "./save-controller.js";
import { Repertoire } from "./repertoire.js";

//get the various NewRepertoire buttons
const deleteModeBtn = document.getElementById("deleteMode");
const addStudyBtn = document.getElementById("addStudy");
const createStudyBtn = document.getElementById("createStudy");

const fileInput = $("#fileInput");

let editRepertoireController: EditRepertoireController; //so the listeners can access



/**
 * helper for creating new reps
 */
export class EditRepertoireController
{

  /** $$$ MODES $$$ */
  deleteMode: boolean = false; // the next chosen thing will be removed


  /**
   * html for dom manipulation
   */
  readonly addStudyEmbed =
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

  readonly chessBoardEmbed =
  `<div id="centerPane" class="centerPane">

    <div id="chessgroundContainer" >
      <!-- Main Chessboard -->
      <img id="chessground" style="object-fit: contain;" src="images/thinking.jpg" frameborder=0></img>
    </div>
  </div>`

  readonly LinesToAddGameEmbed =
  `<div id="centerPane" class="centerPane">
    <h2 style='margin: 15px 0; text-align: center;'>  Line options: </h2>
  </div>`

  readonly repsToAddLineToEmbed =
  `<div id="centerPane" class="centerPane">
    <h2 style='margin: 15px 0; text-align: center;'> Repertoire options: </h2>
  </div> `

  constructor()
  {
    console.log("EditRepertoireController constructed");
    //add listeners
    deleteModeBtn?.addEventListener("click", buttonLnr);
    addStudyBtn?.addEventListener("click", buttonLnr)
    createStudyBtn?.addEventListener("click", buttonLnr);

    //file input listener
    fileInput.on("cancel", () => {
      console.log("File Input canceled.");
    });
    fileInput.on("change", fileInputLnr);
    //make a local file scope variable, so the button listeners can access the controller class
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    editRepertoireController = this;
  }

  /**
   * open lichess study creation
   */
  public createStudy():void
  {
    //open the lichess study page
    window.open("https://lichess.org/study");
    //the rest has to be handled by the user
  }

  /**
   * enter mode where the next rep, line or game chosen is removed
   */
  public enterDeleteMode():void
  {
    //enter delete mode, set the delete mode bool
    this.deleteMode = true;
    $( "#nameLabel" ).text("Delete Mode");
    $( "#nameLabel" ).css("background", "#DD1810");
    hideEditRepertoire();
  }

  /**
   * exit delete mode
   */
  public exitDeleteMode(): void
  {
    //exit delete mode, set the delete mode bool
    this.deleteMode = false;
    $( "#nameLabel" ).text("nrv");
    $( "#nameLabel" ).css("background", "#FDD401");
  }

  /**
   * delete thing
   * @param thing
   */
  public delete(thing: RepertoireLine | ExampleGame | Repertoire): void
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
      this.exitDeleteMode();
      throw error("delete(thing): thing wae not Repertoire, RepertoireLine or ExampleGame: typeOf thing:" + typeof thing);
    }

    //turn off delete mode
    this.exitDeleteMode();
  }
}

/**
 * listener for the fileInput input elem
 */
function fileInputLnr(): void
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
function buttonLnr(event: Event):void
{
  if(event.target == deleteModeBtn)
  {
    console.log("delete mode games btn: DeleteMode entered");
    //enter delete mode
    editRepertoireController.enterDeleteMode();
  }
  else if(event.target == addStudyBtn)
  {
    console.log("study input clicked");
    showAddStudy();
  }
  else if(event.target == createStudyBtn)
  {
    console.log("createStudyBtn clicked");
    editRepertoireController.createStudy();
  }
  else
  {
    throw error("event target was: " + event.target + " this is not one of the buttons.");
  }
}

/**
 * reset back to chessboard view
 */
export function chessBoardView(): void
{
  $( ".chessBoardView" ).css("visibility", "visible");
  //reset the center pane
  $( "#centerPane" ).replaceWith(editRepertoireController.chessBoardEmbed);

  const openRepName = controller.openRep?.name;
  if(openRepName) //if open rep name is a value != false
  {
    controller.setNameElement(openRepName);
  }
}

/**
 * make all the edit repertoire controls hidden
 */
function hideEditRepertoire(): void
{
  console.log("edit rep controls should be hidden");
  console.log(".editRep class stuff " + $( ".editRep" ));
  //hide the edit rep controls
  $( ".editRep" ).css("visibility", "hidden");
}

/**
 * show the lines you can add an example game to
 * @param game example game to add on click
 */
function showLinesToAddGameTo(game: ExampleGame): void
{
  console.log("showLinesToAddGameTo entered with a game named: " + game.name);
  //hide the edit rep controls
  hideEditRepertoire();
  const openRep = controller.openRep;
  if(openRep == null)
  {
    throw error("No open rep to add this game to")
  }

  //set up the center pane
  $( "#centerPane" ).replaceWith(editRepertoireController.LinesToAddGameEmbed)

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
        chessBoardView();

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
function showRepsToAddLineTo(line: RepertoireLine): void
{
  //hide the edit rep controls
  hideEditRepertoire();

  $( "#centerPane" ).html(editRepertoireController.repsToAddLineToEmbed);
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
      chessBoardView();

      controller.changeStudy(line); //display the game on the main board

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
function setAddStudyListeners(): void
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

        showRepsToAddLineTo(line);
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
        showLinesToAddGameTo(game);
        //now, we wait for the uses to click a line then update the lists
        controller.updateOpenRepLists();
      }
    }
  });

  //when done is clicked return to the chessboard view
  $( "#done" ).on("click", () =>
  {
    chessBoardView();
  });
}

/**
 * prepare the embed
 */
function showAddStudy(): void
{
  console.log("show add study entered");

  //hide the edit rep controls
  hideEditRepertoire();

  //replace center html with the study input controls
  $( "#centerPane" ).replaceWith(editRepertoireController.addStudyEmbed);

  //hide chessboard view
  $( ".chessboardView" ).css("visibility", "hidden");

  //add listeners to new content
  setAddStudyListeners();
}


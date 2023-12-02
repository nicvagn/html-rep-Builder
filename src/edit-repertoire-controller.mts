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
import { controller } from "./index.js";
import { RepertoireLine } from "./repertoire-line.js";

//import { event } from "jquery";

//get the various NewRepertoire buttons
const editLineBtn = document.getElementById("editLine");
const resetLinesBtn = document.getElementById("resetLines");
const resetGamesBtn = document.getElementById("resetGames");
const saveBrowserBtn = document.getElementById("saveBrowser");
const addStudy = document.getElementById("addStudy");

let editRepertoireController: EditRepertoireController; //so the listeners can access



//for popup windows
// const windowFeatures = "width=900,height=700,popup";

/**
 * html for dom manipulation
 */
const addStudyEmbed =
`<div id="addStudyEmbed">

  <div id="URLIntructions" style="margin: 15px auto;" >
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
</div>`

const chessBoardEmbed =
`<div id="centerPane" class="centerPane">

  <h2 id="nameLabel">Placeholder Name</h2>

  <div id="chessgroundContainer" >
    <!-- Main Chessboard -->
    <img id="chessground" style="object-fit: contain;" src="images/thinking.jpg" frameborder=0></img>
  </div>
</div>`

const LinesToAddGameTo =
`<div id="centerPane" class="centerPane>

  <h1>hello</h1>
  <h2 style='margin: 15px auto'> Line options: </h2>
</div>`

/**
 * helper for creating new reps
 */
export class EditRepertoireController
{

  constructor()
  {
    console.log("EditRepertoireController constructed");
    //add listeners
    editLineBtn?.addEventListener("click", buttonLnr);
    resetLinesBtn?.addEventListener("click", buttonLnr);
    resetGamesBtn?.addEventListener("click", buttonLnr);
    saveBrowserBtn?.addEventListener("click", buttonLnr);
    addStudy?.addEventListener("click", buttonLnr)


    //make a local file scope variable, so the button listeners can access the controller class
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    editRepertoireController = this;
  }

  public getFromPop(study: ExampleGame | RepertoireLine | null): void
  {
    if(study == null)  //if we did not get anything from the user, do nothing
    {
      console.log("No ExampleGame | RepertoireLine was provided, null was.")
    }
    else
    {
      const openRep = controller.openRep;
      if (openRep) //if open rep is a thing
      {
        if(study instanceof RepertoireLine) //if it is a line, add it to the rep
        {
          console.log("popup line added. Name: " + study.name)
          openRep.addLine(study);
        }

        //otherwise it must be a game or an error
        const openLine = openRep.getOpenLine();
        if (openLine) //check if open line is valid
        {
          if (study instanceof ExampleGame)
          {
            console.log("input game added. Name: " + study.name);
            openLine.addGame(study);
          }
        }
        else
        {
          throw error("thing is not an instance of ExampleGame || RepertoireLine");
        }
      }
      else
      {
        throw error("Open rep is null | undefined | false");
      }
    }
  }

  /**
   *  edit a line, you can add games to a line, change the name, etc. Shows a popup
   * to accomplish this
   */
  public editLine():void
  {
    //edit line
    console.log("EditLine entered");
    const windowFeatures = "popup";
    window.open("https://lichess.org/study/PYEVM2pA/POney1Ru", "mozillaWindow", windowFeatures);
  }

  public resetLines():void
  {
    //reset lines
  }

  public resetGames():void
  {
    //reset games
  }

  public saveToBrowser():void
  {
    //save to browser
  }
}

/**
 * the listener for the addGame and addLine buttons
 * @param event the event that triggered
 */
function buttonLnr(event: Event):void
{
  if(event.target == editLineBtn)
  {
    console.log("Edit Line btn was the target");

    editRepertoireController.editLine();
  }
  else if(event.target == resetLinesBtn)
  {
    console.log("reset Lines btn");
    //reset lines
    editRepertoireController.resetLines();
  }
  else if(event.target == resetGamesBtn)
  {
    console.log("reset games btn");
    //reset games
    editRepertoireController.resetGames();
  }
  else if(event.target == saveBrowserBtn)
  {
    console.log("save browser btn");
    //save to browser
    editRepertoireController.saveToBrowser();
  }
  else if(event.target == addStudy)
  {
    console.log("study input clicked");
    showAddStudy();
  }
  else
  {
    throw Error("event target was: " + event.target + " this is not one of the buttons.");
  }
}

/**
 * reset back to chessboard view
 */
export function chessBoardView()
{
  $( ".chessBoardView" ).css("visibility", "visible");
  //reset the center pane
  $( "#centerPane" ).html(chessBoardEmbed);
}

function showLinesToAddGameTo(game: ExampleGame): void
{
  const openRep = controller.openRep;
  if(openRep == null)
  {
    throw error("No open rep to add this game to")
  }

  //set up the center pane
  $( "#centerPane" ).html(LinesToAddGameTo);

  for(let x = 0; x < openRep.lineList.length; x++)
  {
    //create a button with each of the line names
    const btn = $("<button/>",
    {
      text: openRep.lineList[x].name,
      //add a lister to add the game to that line
      click: openRep.lineList[x].addGame(game),
    });

    $(btn).css(
      {
        "margin": "0 auto",
        "min-width": "450px",
        "width": "fit-content",
        "hight": "45px"
      });

    $( "#centerPanexxx" ).append(btn);
  }
}

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
    console.log("addURL pressed.")
    //hide instructions
    $( "#URLInstructions" ).css("display", "none");

    //get study url
    const studyURLInput:HTMLInputElement| null = document.getElementById( "studyTextField" ) as HTMLInputElement;

    if(studyURLInput == null)
    {
      throw error("studyURLInput is null");
    }

    //get the value from the studyURLInput
    const studyURL = studyURLInput.value;
    console.log("Study URL: " + studyURL);

    const isLine = document.getElementById("lineToggle") as HTMLInputElement;
    console.log("isLine toggle val: " + isLine);

    if(typeof studyURL === "string" && studyURL != null) // if url is typeof string
    {
      console.log("the given url: " + studyURL)

      //ask user what to call this game
      let gameName;
      do{
        gameName = prompt("What do you want to call this game?");
      }while(gameName == null) //do not let the gameName be null

      const game = new ExampleGame(gameName, studyURL);

      //what line should we add this to?
      showLinesToAddGameTo(game);
      //now, we wait for the uses to click a line
    }
  });

  //when done is clicked return to the chessboard view
  $( "#done" ).on("click", () =>
  {
    chessBoardView();
  });
}

/**
 * prepare the pop up
 */
function showAddStudy()
{
  console.log("show add study entered");

  //replace center html with the study input controls
  $( "#centerPane" ).html(addStudyEmbed);

  //hide chessboard view
  $( ".chessboardView" ).css("visibility", "hidden");

  //add listeners to new content
  setAddStudyListeners();

  const url = $( "#studyTextField" ).val();
  console.log("URL given " + url);
}


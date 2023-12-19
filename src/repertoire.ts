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

import { RepertoireLine } from "./repertoire-line.js";
import { controller } from "./index.js";
import { saveRep } from "./save-controller.js";
import { repJSON, loadLine } from "./save-controller.js";

/**
 * A chess repertoire
 */
export class Repertoire
{

  name: string;
  studyURL: string;
  lineList: RepertoireLine[] = new Array<RepertoireLine>;  // array of lines in this rep
  openLine!: RepertoireLine; //the currently open line
  mainLine: RepertoireLine;

  nameLabel: HTMLElement = document.getElementById("#nameLabel")!; //for the current rep name
  //line button for display on the DOM
  public repertoireBtn!: JQuery<HTMLElement>;

  /**
   * make a new Rep
   * @param {string} name name to give
   * @param studyURL the lichess url of the primary study chapter of this
   * @param lineList list of lines in this rep
   */
  constructor(name: string, studyURL: string, lineList?: RepertoireLine[])
  {
    console.log("rep with name:" + name + ", Line List: " + lineList +" studyURL: " + studyURL + "made");

    this.studyURL = studyURL;
    this.name = name;
    this.createRepBtn();

    //add the main line to the line list and set it as the open line
    this.mainLine = new RepertoireLine( this.name + ": Main Line", studyURL);
    this.addLine(this.mainLine);

    if (lineList != undefined)
    {
      this.lineList = new Array<RepertoireLine>();
      for(let x = 0; x < lineList.length; x++)
      {
        //add the given line list to our line list
        this.lineList.push( lineList[x] );
      }
    }
  }

  /* interface repJSON
  {
    name_key: string;
    type: "rep";
    studyURL: string;
    lines: RepertoireLine[];
  }*/
  /**
   * prepare repertoire for saving as json
   * @returns JSON of this object for saving
   */
  public toJSON(): repJSON
  {
    return {
      name_key: this.name,
      type: "rep",
      studyURL: this.studyURL,
      lineKeys: this.getLineKeys(),
    }
  }
  /**
   * take a json rep, and create a new rep Object
   * @param repjson of the repertoire
   * @returns the new created rep with all the old reps data
   */
  public static fromJSON(repjson: repJSON): Repertoire
  {
    const loadedLines = new Array<RepertoireLine>();
    repjson.lineKeys.forEach(lnKey => {
      loadedLines.push( loadLine(lnKey) );
    });
    return new Repertoire(repjson.name_key, repjson.studyURL, loadedLines);
  }

  /**
   * get the line keys lines are stored under in LS
   * @returns the line keys for getting lines from LS
   */
  private getLineKeys(): string[]
  {
    const lineKeys = new Array<string>();
    this.lineList.forEach(line => {
      lineKeys.push(line.name);
    });

    return lineKeys;
  }

  /**
   * create the rep button and add it to the DOM
   * with a lister attached the rep must have a name
   */
  private createRepBtn(): void
  {
    //create the visual button for the gui
    this.repertoireBtn = $("<button/>", {
        text: this.name,
        id: this.name,
        rep: this
        });
    this.repertoireBtn.addClass("repBtn delete-mode");

    //add lister
    this.repertoireBtn.on("click", { rep: this }, function (event)
        {
          //if the delete mode is on, delete this rep
          if(controller.editRepController.deleteMode)
          {
            controller.editRepController.delete(event.data.rep);
            controller.updateRepList();
          }
          else
          {
            controller.openRepertoire(event.data.rep);
          }
        });
  }

  /**
   * add a line to this repertoire object
   * @param repLine - a RepertoireLine
   */
  public addLine(repLine: RepertoireLine): void
  {
    console.log("Add line entered with: " + RepertoireLine.name)
    console.log(repLine.name + "added to Line list");
    this.lineList.push(repLine);
    this.updateLineDisplay();
  }

  /**
   * display the lines on the DOM
   */
  public updateLineDisplay(): void
  {
    console.log("updateLineDisplay() entered");
    console.log("----------------------------------");
    console.log("Line List: ");

    //empty the doc line list
    $("#lineList").replaceWith("<div id='lineList'> </div>");

    //for each LINE append to the line list spot
    this.lineList.forEach((line) =>
    {
      console.log("line: " + line.name);

      line.lineBtn.appendTo($( "#lineList" ));

      line.lineBtn.on("click", { line:line }, function (event)
      {
        //update this lines game display
        event.data.line.select();
        //update main board to display the game
      });
    });
  }

  /**
   * reset the lineList to empty
   */
  public resetLines(): void
  {
    if (confirm("reset lines?"))
    {
      //confirm reset lines
      //make the line empty again
      this.lineList = new Array<RepertoireLine>();
      //empty the doc line list
      $("#lineList").replaceWith("<div id='lineList'> </div>");
    }
  }

  /**
   * save this rep to local storage with its key being it's name
   */
  public saveRep(): void
  {
    console.log("save Rep Pressed");
    saveRep(this);
  }


  /**
   * get the open line, throws error if no open line
   * @returns the open repertoire line
   */
  public getOpenLine(): RepertoireLine
  {
    if (this.openLine != undefined)
    {
      return this.openLine;
    }
    else
    {
      //return the main line
      return this.mainLine;
    }
  }

  /**
   * open a RepLine line and corresponding game list
   * @param line Line to open
   */
  public setOpenLine(line: RepertoireLine): void
  {
    this.openLine = line;
    //set name label
    controller.setNameElement(line.name);
    line.select();
  }

  /**
   * open this repertoire
   */
  public open(): void
  {
    console.log("open entered on rep: " + this.name);

    //set this an open rep
    controller.openRep = this;
    //change the displays
    controller.setNameElement(this.name!);
    controller.changeStudy(this);

    controller.updateOpenRepLists(); //reset the line and game list

    console.log("line List length: " + this.lineList.length);
    console.log("main line example game list: " + this.mainLine.exampleGames)

   this.lineList.forEach((line) =>
   {
     console.log(line);
     console.log("line added to lineList: " + line.name);
     line.lineBtn.appendTo($( '#lineList' ));

     line.lineBtn.on("click", { line:line }, function (event)
       {
         console.log("line btn clicked with name: " + line.name);
         event.data.line.select();
       });
   });

   //open the main lines example games
   this.mainLine.refreshGameDisplay();
 }

 /**
  * get the rep button for this repertoire
  * @returns the RepButton element
  */
 public getRepButton(): JQuery<HTMLElement>
 {
  return this.repertoireBtn;
 }

 public toString(){
  let repSting = "++++++++++++++ repertoire toString:"+ this.name + " +++++++++++++++++\n";
  if(this.lineList != null)
  {
    this.lineList.forEach(line => {
      repSting += line;
    });
  }
  return repSting;
 }
}
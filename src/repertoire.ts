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
//import { SaveController } from "./save-controller.js";



/**
 * A chess repertoire
 */
export class Repertoire
{

  name: string | null = null; //the name = null is used to make sure name is set
  lineList: RepertoireLine[] = new Array<RepertoireLine>();  // array of lines in this rep
  openLine?: RepertoireLine; //the currently open line, may not be defined
  studyUrl: string;

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

    this.studyUrl = studyURL;
    this.name = name;
    this.createRepBtn();

    if (lineList != undefined)
    {
      this.lineList = lineList;
    }
  }

  /**
   * create the rep button and add it to the DOM
   * with a lister attached the rep must have a name
   */
  private createRepBtn()
  {
    //create the visual button for the gui
    this.repertoireBtn = $("<button/>", {
        text: this.name,
        id: this.name,
        rep: this
        });
    this.repertoireBtn.addClass("repBtn");

    //add lister
    this.repertoireBtn.on("click", { controller: controller, rep: this }, function (event)
        {
          event.data.controller.openRepertoire(event.data.rep);
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
        event.data.line.openLine();
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
    //SaveController.getRepertoireFromLocal(this.name);
    console.log("save Rep Pressed");
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
      throw Error("no open line.");
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
    line.openLine();
  }

  /**
   * change the board to a new line
   * @param line { RepertoireLine } line to switch to
   */
  public open(): void
  {
    console.log("open entered on rep: " + this.name);

    //change the displays
    controller.setNameElement(this.name!);
    controller.changeStudy(this);

   //empty the doc game list
   $("#gameList").replaceWith("<div id='gameList'> </div>");

   //empty the doc line list
   $("#lineList").replaceWith("<div id='lineList'> <div>")
   console.log("line List length: " + this.lineList.length);
   console.log("example game list: " + this.lineList)

   this.lineList.forEach((line) =>
   {
     console.log(line);
     console.log("line added to lineList: " + line.name);
     line.lineBtn.appendTo($( '#lineList' ));

     line.lineBtn.on("click", { line:line }, function (event)
       {
         console.log("line btn clicked with name: " + line.name);
         event.data.line.openLine();
       });
   });
 }
}
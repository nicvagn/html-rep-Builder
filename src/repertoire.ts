/*********************************************************************************
 * a typescript chess repertoire builder. including line and example game viewing
 *  made for shcc: Saskatchewan Horizon Chess Club
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

  name?: string;
  lineList: RepertoireLine[] = new Array<RepertoireLine>();  // array of lines in this rep
  openLine?: RepertoireLine; //the currently open line, may not be defined

  nameLabel: HTMLElement = document.getElementById("nameLabel")!; //for the current rep name

  /**
   * make a new Rep
   * @param {string} _name name to give
   * @param lineList list of lines in this rep
   */
  constructor(_name?: string, _lineList?: RepertoireLine[])
  {
    console.log("rep with name:" + _name + ", Line List: " + _lineList + "made");

    if (_name != undefined)
    {
      this.name = _name;
    }
    else
    {
      this.setName();
    }
    if (_lineList != undefined)
    {
      this.lineList = _lineList!;
    }
  }

  /**
   * set the name field if none was provided
   */
  public setName(): void
  {
    let name;
    do  //don't let the name be undefined
    {
      name = prompt("What would you like to call the new repertoire?")!;
    }
    while (name == undefined);

  }


  /**
   * add a line to this repertoire object
   * @param repLine - a RepertoireLine
   */
  public addLine(repLine: RepertoireLine): void
  {
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

  /*  relic of trying to make event handlers work
  public getLineByName(name: String): RepertoireLine
  {
    console.log("Name we are looking for " + name);
    for (let i = 0; i < this.lineList.length; i++)
    {
      if (this.lineList[i].name == name)
      {
        console.log("this.lineList[i].name" + this.lineList[i].name);
        return this.lineList[i];
      }
    }
    throw new Error("The line list does not contain a line with the name: " + name);
  }
  */



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
    //set nme label
    controller.setNameElement(line.name);
    line.openLine();
  }

/**
 * change the board to a new line
 * @param line { RepertoireLine } line to switch to
 */
  public switchLine(line: RepertoireLine): void
  {
    console.log("switch line entered with line: " + line.name);

    console.log("switch line entered with line named: " + line.name);

    //change the displays
    controller.setNameElement(line.name);
    controller.changeStudy(line);
  }
}
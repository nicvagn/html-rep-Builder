/* a typescript chess repertoire builder. including line and example game viewing made for shcc
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
 */

import { RepertoireLine } from "./repertoire-line.js";
import { SaveController } from "./save-controller.js";

/**
 * A chess repertoire
 */
export class Repertoire {

  name: string;  // the name of the repertoire
  lineList?: [RepertoireLine];  // array of lines in this rep
  openLine?: RepertoireLine; //the currently open line, may not be defined

  /**
   * make a new Rep
   * @param {string} _name name to give
   * @param _lineList list of lines in this rep
   * @param _gameList list of instructive games
   */
  constructor(_name: string, _lineList?: [RepertoireLine])
  {
    console.log("rep with name:" + _name + ", Line List: " + _lineList + "made");
    this.name = _name;

    //set the game and line list to the ones provided to the constructor
    this.lineList = _lineList;
  }

  /**
   * make a Repertoire with only a name
   * @param {string} name the rep nama
   * @returns a Repertoire with a name and nothing else
   */
  public static repertoireOnlyName(name:string)
  {

    console.log("rep with only name called");
    return new Repertoire(name);
  }

  /**
   * add a line to this repertoire object
   * @param repLine - a RepertoireLine
   */
  public addLine(repLine:RepertoireLine)
  {

    //if the line list is undefined
    if(this.lineList == undefined){
      this.lineList = [repLine];
    }
    else  //otherwise, push it on
    {
      this.lineList.push(repLine);
    }
  }

  /**
   * reset the lineList to undefined
   */
  resetLines()
  {

    if(this.lineList == undefined){
      return; // if line list is already undefined
    }
    if(confirm("reset lines?")){  //confirm reset lines
      //make the line list undefined again
      this.lineList = undefined;
    }
  }

  /**
   * save this rep
   */
  saveRep()
  {

    //convert rep to json string
    let stringify_rep = SaveController.createStringForLocalStorage(this);

    //put the rep in local storage with it's key being it's name
    localStorage.setItem(stringify_rep, this.name);
  }
}
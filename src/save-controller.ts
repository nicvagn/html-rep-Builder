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

import { openRep } from "./repertoire-controller.js";
import { Repertoire } from "./repertoire.js";


export class SaveController{

  /**
   * open a repertoire from local storage
   * @param {string} repName the name of the rep
   * @returns {JSON} the repertoire you opened as json
   */
  public openRepertoire(repKey:string){

    return this.getFromLocalStorage(repKey);
  }

  /**
   * converts json into a json string ready to be stored locally in localStorage
   * @param {JSON} data the json to be converted to string
   * @returns JSON converted to string for local storage
   */
  public static createStringForLocalStorage(data:Object) {

    let stringData: string;

    if (typeof data != "string") {
       stringData = JSON.stringify(data)!;
    }
    else
    {
      stringData = data;
      throw new Error("data is already a string.");
    }


    return stringData; // return stringified data
  }

  // this function gets string from localStorage and converts it into JSON

  /**
   * retrieve from local storage
   * @param {string} key the key of the item to be retrieve
   * @returns the retrieve item in json
   */
  private getFromLocalStorage(key: string):JSON {

    //try to grab element tied to the key

    let gameGrab:string | null = localStorage.getItem(key);

    if(gameGrab != null){
      return JSON.parse(gameGrab);
    }
    else
    {
      return JSON.parse("{'error': {'no item at that key'}}");
    }
  }


  /** We will maybe work with local storage later
   * For generating a text file URL containing given text
   * @param {string} txt the text to use when creating the file URL
   * @returns created URL
   *
  private  generateTextFileUrl(txt: string) {

      let fileData = new Blob([txt], {type: 'text/plain'});
      // If a file has been previously generated, revoke the existing URL
      if (textFileUrl !== null) {
          window.URL.revokeObjectURL(textFile);
      }
      textFileUrl = window.URL.createObjectURL(fileData);
      // Returns a reference to the global variable holding the URL
      return textFileUrl;
  }


  /**
   * create the download link for rep
   * Generate the file download URL and assign it to the link
   *
  private showDownload(){

    let downloadLink = document.getElementById('downloadLink');
    downloadLink!.style.visibility = "visible";
    window.addEventListener("load", function(){
      downloadLink.HR = generateTextFileUrl(openRep);
    });
  }
  */
}
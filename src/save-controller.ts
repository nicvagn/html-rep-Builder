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


import { Repertoire } from "./repertoire.js";

/**
 * a helper class full of static methods to aid in saving to local storage
 */
export class SaveController
{

  /**
   * Save a Repertoire to Local Storage
   * @param { string } key the key to put this under in local storage
   * @param { Repertoire } rep the repertoire to save to local storage
   */
  public static saveRepToLocal(key: string, rep: Repertoire): void
  {
    this.putLocal(key, rep);
  }

  /**
   * get a repertoire from local storage
   * @param {string} repKey the name of the rep
   * @returns {Repertoire} the repertoire you opened as json
   */
  public static getRepertoireFromLocal(repKey: string): Repertoire
  {
    let obj = SaveController.getFromLocal(repKey);

    //check to make sure what we have is a rep
    if (obj instanceof Repertoire)
    {
      return obj;
    }
    else
    {
      throw Error("Returned obj not a repertoire");
    }
  }

  /**
   * retrieve from local storage
   * @param {string} key the key of the item to be retrieve
   * @returns the retrieve item in json
   */
  private static getFromLocal(key: string): Object
  {
    //try to grab element tied to the key

    let grab: string | null = localStorage.getItem(key);

    if (grab != null) {
      return JSON.parse(grab);
    } else {
      throw Error("Retried obj null");
    }
  }

  /**
   * put a object in local storage. We will turn it into JSON and store it
   * @param key the key to put that object's json under in local. The key is used to retrieve the item
   * @param object a javascript object to be put into storage
   */
  private static putLocal(key: string, object: Object)
  {
    console.log("putLocal() entered. Key: " + key + "object: " + object);

    //create a stringified version of the object
    let strObject = JSON.stringify(object);

    console.log("strObject: " + strObject);
    //localStorage.setItem(key, strObject);
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
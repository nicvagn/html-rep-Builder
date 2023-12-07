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
import { Repertoire } from "./repertoire.js";
import { Controller } from "./repertoire-controller.mjs";
import { mainKey, controller, REPs, GAMEs, LINEs} from "./index.js";
import { ExampleGame } from "./example-game.js";

// $$$$$$$$$$$$$$$$$$$$$$$$ JSON types $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// A representation of the example game for JSON
export interface gameJSON
{
  name: string;
  studyURL: string;
}

export interface lineJSON
{
  name: string;
  studyURL: string
}


// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$



function putLocal(key: string, object: unknown): void
{
  console.log("putLocal() entered. Key: " + key + " object: " + object);

  //create a stringified version of the object
  const strObject = JSON.stringify(object);

  console.log("strObject: " + strObject);
  localStorage.setItem(key, strObject);
}


/**
 * retrieve from local storage
 * @param {string} key the key of the item to be retrieve
 * @returns the retrieve item as JSON, or null on error
 */
export function getFromLocal(key: string): gameJSON | null
{
  let grab;
  //try to grab element tied to the key
  try
  {
    grab = localStorage.getItem(key);
  }
  catch (error)
  {
    console.error("We tried to get from local storage. ERROR: " + error)
  }

  if (grab != null) {
    return JSON.parse(grab);
  } else {
    console.error("Retried obj null. Do we have the right key? key used: " + key);
    return null;
  }
}

export function saveRep(rep: Repertoire): void
{
  let key;
  if(rep == null)
  {
    throw error("given repertoire was null or undefined.");
  }
  else
  {
    key = rep.name;
    if(key == null)
    {
      throw error("rep.name is null. We can not save a rep with no name");
    }
  }
  const flatRep =
  {
    "name": rep.name,
    "lines": rep.lineList
  }

  putLocal(key, flatRep)
}

/**
 * save a chess game. The key will be it's name
 */
export function saveGame(game: ExampleGame): void
{
  putLocal(game.name, game);
}

/**
 * load all the pertinent details from local storage to load an ExampleGame
 * returns null if nothing is found or data is not complete
 * @param key the key the game is stored under
 */
export function loadGame(key: string): ExampleGame | null
{
  console.log("loadGame(key) entered with key: " + key);

  //get the game save data from local storage (null fetch is handled within)
  const gameSaveData = getFromLocal(key);

  console.log(gameSaveData);

  if(gameSaveData != null)
  {
    if(gameSaveData.name != null || gameSaveData.studyURL != null)
    {
      //return new ExampleGame with saved properties
      return new ExampleGame(gameSaveData.name, gameSaveData.studyURL);
    }
  }

  //otherwise return null
  return null;
}

/**
 * get a organized list of all the data needed for a save
 * @returns array with all of the info needed for a save
 */
function getSaveData(): Map<string, string | object>
{
                        // name to JSON.stringify(rep)
  const saveData = new Map<string, string | object>();
  //a list of the names of the reps that have to be saved
  const repList = new Array<string>();

  $.each(controller.repList, function (_, rep)
    {
      repList.push(rep.name);  //add the name of the rep to the list
      saveData.set(rep.name, JSON.stringify(rep));
    });

  saveData.set(REPs, repList)
  return saveData;
}

/**
 * save everything so the state of the controller can be reconstructed from the save
 */
export function save(): void
{
  //todo this
  const saveData = getSaveData();
  console.log("save() entered on SaveController()");
  console.log(saveData)
}

/**
 * load save into a controller
 * @param controller the controller to load the save into
 */
export function load(controller: Controller): void
{
  //todo
}



/*
type RepMap = {
  [id: string]: string;
}

function flattenRep(rep: Repertoire)
{
  //todo this
  return {
  "name": rep.name,
  "main-line": rep.mainLine
  ""
}

export function save(): void
{
  const repList = controller.repList;
  for(let x = 0; x < repList.length; x++)
  {
    saveRep(repList[x])
  }

  const repMap: RepMap = {};
  for( let x = 0; x < repList.length; x++)
  {
    repMap[repList[x].name] = flattenRep(repList[x]);
  }
  //save the repertoires list
  putLocal("repertoires", )
}

*/
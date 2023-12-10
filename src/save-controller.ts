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
import { controller, REPs } from "./index.js";
import { ExampleGame } from "./example-game.js";
import { RepertoireLine } from "./repertoire-line.js";

//$$$$$$$$$$$$$$$$$$$$$ keys $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const MAIN = "Repertoire-Builder";
// $$$$$$$$$$$$$$$$$$$$$$$$ types $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

type chessThingJSON = "line" | "game" | "rep";
//type chessThing = Repertoire | RepertoireLine | ExampleGame;

// $$$$$$$$$$$$$$$$$$$ JSON interfaces $$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// A representation of the example game for JSON
export interface gameJSON
{
  name: string;
  type: chessThingJSON;
  studyURL: string;
}

export interface lineJSON
{
  name: string;
  type: chessThingJSON;
  studyURL: string;
  exampleGameKeys: string[];
}

export interface repJSON
{
  name: string;
  type: chessThingJSON;
  studyURL: string;
  lineKeys: string[];
}

interface MAINJSON
{
  repertoires: repJSON[];
}


// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


/**
 * put a string rep of an object in local storage under a key
 * @param key the key to store the JSON.stringified(object)
 * @param object a stringify-able Object
 */
function putLocal(key: string, object: unknown): void
{
  console.log("putLocal() entered. Key: " + key + " object: " + object);

  //create a stringified version of the object
  const strObject = JSON.stringify(object);

  console.log("strObject: " + strObject);
  window.localStorage.setItem(key, strObject);
}

/**
 * get the string stored in local storage under a key
 * @param key string stored in local storage under a given key
 * @returns false if no string was found, else the found str
 */
function getLocal(key: string): string
{
  const fetch = window.localStorage.getItem(key);

  if(fetch == null)
  {
    throw error("getItem(" + key + ") got a null fetch.");
  }
  return fetch;
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

  //the names of all the lines of rep for later later loading
  const repLines = new Array<string>();

  const lineList = rep.lineList;
  for(let x = 0; x < lineList.length; x++)
  {
    const line = lineList.at(x)!;

    repLines.push(line.name);
    saveLine(line);
  }

  const repGames = new Array<string>();
  for(let x = 0; x < lineList.length; x++)
  {

    const line = lineList.at(x)!;

    const lineGames = line.getGames();

    for(let x = 0; x < lineGames.length; x++)
    {
      const game = lineGames[x];
      //add game name to the rep game list for later retrieval
      repGames.push(game.name);
      //save each game
      saveGame(game);
    }
  }

  const flatRep: repJSON =
  {
    name: rep.name,
    type: "rep",
    studyURL: rep.studyURL,
    lineKeys: repLines
  }

  putLocal(key, flatRep) //key in rep.name we built flat rep
}

/**
 * save a chess game. The key will be it's name
 */
function saveGame(game: ExampleGame): void
{
  //save the game
  putLocal(game.name, game);
}

/**
 * save a chess repertoire line. The key will be it's name
 */
function saveLine(line: RepertoireLine): void
{
  //save the line
  putLocal(line.name, line);
}

/**
 * load all the pertinent details from local storage to load an ExampleGame
 * returns null if nothing is found or data is not complete
 * @param key the key the game is stored under
 * @returns the Example game corresponding to that gameJSON under that key
 * if it is valid, else throw an error
 */
export function loadGame(key: string): ExampleGame
{
  console.log("loadGame(" + key + ") entered with key: " + key);

  //get the JSONString from local storage
  const gameJSON_str = getLocal(key);

  return loadGameFromJSONstr(gameJSON_str);
}

/**
 * load a game fromJSON string
 * @param JSONstr the string of gameJSON
 * @returns parsed ExampleGame
 */
function loadGameFromJSONstr(JSONStr: string): ExampleGame
{
  const gameObj = JSON.parse(JSONStr);

  return loadGameFromJSON(gameObj);
}

/**
 * load a game from JSON object
 * @param gameJSON the gameJSON to parse into an ExampleGame
 * @returns parsed ExampleGame
 */
function loadGameFromJSON(gameJSON: gameJSON): ExampleGame
{

  if(gameJSON.name != null || gameJSON.studyURL != null)
  {
    //return new ExampleGame with saved properties
    return new ExampleGame(gameJSON.name, gameJSON.studyURL);
  }

  throw error("loadGame: name or studyURL null name: " + gameJSON.name + " studyURL " + gameJSON.studyURL);
}

/**
 * load a line from a key for JSON in local storage
 * @param key the key for the lineJSON in local storage
 * @returns a rep line made from that JSON
 */
export function loadLine(key: string): RepertoireLine
{

  const lineJSONstr = getLocal(key);
  //get the lineJSON stored in local storage
  return loadLineFromJSONstr(lineJSONstr);
}

/**
 * parse a RepertoireLine from a JSONstr.
 * @param JSONStr the string of JSON to be parsed
 * @returns the RepertoireLine parsed.
 */
function loadLineFromJSONstr(JSONStr: string): RepertoireLine
{
  //parse the string as lineJSON
  const lineObj = JSON.parse(JSONStr) as lineJSON;

  return loadLineFromJSON(lineObj);
}

function loadLineFromJSON(lineJSON:lineJSON):RepertoireLine
{
  if(lineJSON.name == null || lineJSON.studyURL == null)
  {
    throw error("ERROR: lineJSON.name = " + lineJSON.name + " lineJSON.studyURL = " + lineJSON.studyURL);
  }

  //make a new rep line
  const line = new RepertoireLine(lineJSON.name, lineJSON.studyURL);

  //check if we have example games to add to it
  const exGames = lineJSON.exampleGameKeys;

  //if there are example games for this line, add them
  if(exGames != undefined)
  {
    for(let x = 0; x < exGames.length; x++)
    {
      //rebuild the ex game from JSON string, by using their key to grab the game from storage
      const exGameKey = exGames[x];
      const exGame: ExampleGame = loadGame(exGameKey);

      //add the built game to the line
      line.addGame(exGame);
    }
  }

  return line;
}


/**
 * load an entire repertoire from local storage
 * @param key the key to find the rep we have to load under in local storage
 * @returns the loaded Repertoire
 */
export function loadRep(key: string): Repertoire
{
  if(key == null)
  {
    throw error("ERROR: key we got is null.");
  }

  const repJSON = getLocal(key);
  const rep = loadRepFromJSONstr(repJSON)

  return rep;
}

/**
 * parse a rep from JSONstr
 * @param JSONstr the string of JSON to be parsed
 * @returns the parsed out repertoire
 */
function loadRepFromJSONstr(JSONstr: string):Repertoire
{
  const repObj = JSON.parse(JSONstr);

  //parse the object into a rep
  const rep = loadRepFromJSON(repObj);

  return rep;
}

function loadRepFromJSON(repObj: repJSON):Repertoire
{
  //get the repertoire static characteristics
  const name = repObj.name;
  const studyURL = repObj.studyURL;

  //create a rep w/o lines.
  const rep = new Repertoire(name, studyURL);

  //add the needed lines
  const lnKeys = repObj.lineKeys;
  for(let x = 0; x < lnKeys.length; x++)
  {
    const line = loadLine(lnKeys[x]);
    //add the required line
    rep.addLine(line);
  }

  return rep;
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
  //save the main data
  const mainSaveData = getSaveData();
  console.log("save() entered on SaveController()");
  console.log(mainSaveData);

  putLocal(MAIN, mainSaveData);
}

/**
 * load save into a controller
 * @param controller the controller to load the save into
 */
export function load(controller: Controller): void
{
  // get the main save data from local storage
  const saveStr = getLocal(MAIN);
  console.log("load() entered: getLocal(MAIN) = " + saveStr);

  if(saveStr == null)
  {
    throw error("load: null save.");
  }
  console.log(" SAVE STRING: " + saveStr);
  const saveObj = JSON.parse(saveStr) as MAINJSON;

  for(let x = 0; x < saveObj.repertoires.length; x++)
  {
    //load each rep
    const repJSON = saveObj.repertoires[x];
    console.log("repJSON: " + repJSON);
    const loadedRep = loadRepFromJSON(repJSON);
    //add all the loaded reps to the controller
    controller.addRepertoire(loadedRep);

  }
}

//test save controller
export function test(): void
{

  const savedLine = loadLine("line test");
  if(savedLine != null)
  {
    controller.changeStudy(savedLine)
  }
}
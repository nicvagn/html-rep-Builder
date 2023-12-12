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
import { controller, REPKEYS } from "./index.js";
import { ExampleGame } from "./example-game.js";
import { RepertoireLine } from "./repertoire-line.js";
import { Controller } from "./repertoire-controller.mjs";

// $$$$$$$$$$$$$$$$$$$$ types $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

type chessThingJSON = lineJSON | repJSON | gameJSON;
type chessThing = Repertoire | RepertoireLine | ExampleGame;

// $$$$$$$$$$$$$$$$$$$ JSON interfaces $$$$$$$$$$$$$$$$$$$$$$$$
// A representation of the example game for JSON
export interface gameJSON
{
  name_key: string;
  type: string; // "line" | "game" | "rep"
  studyURL: string;
}

export interface lineJSON
{
  name_key: string;
  type: string; // "line" | "game" | "rep"
  studyURL: string;
  exampleGameKeys: string[];
}

export interface repJSON
{
  name_key: string;
  type: string; // "line" | "game" | "rep"
  studyURL: string;
  lineKeys: string[];
}

// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


/**
 * put a string rep of an object in local storage under a key
 * @param key the key to store the JSON.stringified(object)
 * @param chessThing a chessThing, a type we made for convenance
 */
function putChessThingLocal(key: string, chessThing: chessThing): void
{
  console.log("putChessThingLocal() entered. \n Key: " + key + "\n object: " + chessThing.toString());

  //create a stringified version of the object
  const strObject = JSON.stringify(chessThing);

  console.log("strObject: " + strObject);
  localStorage.setItem(key, strObject);
}

/**
 * get a chess thing's JSON from local Storage and use the key to get the
 * Repertoire, RepertoireLine, or ExampleGame from LS
 * @param key the string key to get from LS
 * @returns parsed JSON object found under the key
 */
function getChessThing(key: string): chessThing
{
  const grab = getLocal(key);

  const parsed = JSON.parse(grab) as chessThingJSON;

  let chessThing;
  //use a switch to determine the type of the fetch
  switch(parsed.type)
  {
    case "game":
      //it is an ExampleGame
      chessThing = loadGame(key);
      break;
    case "line":
      //it is a RepertoireLine
      chessThing = loadLine(key);
      break;
    case "rep":
      // if it is a Repertoire
      chessThing = loadRep(key);
      break;
    default:
      error("getChessThing(): chessThing is not of type line, rep, or game.");
  }

  return chessThing!;
}

/**
 * get the string stored in local storage under a key
 * @param key string stored in local storage under a given key
 * @returns false if no string was found, else the found str
 */
function getLocal(key: string): string
{
  const fetch = localStorage.getItem(key);

  if(fetch == null)
  {
    throw error("getItem( key: " + key + " ) got a null fetch.");
  }
  return fetch;
}

/**
 * save a rep
 * @param rep repertoire to save
 */
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

  putChessThingLocal(key, rep) //key in rep.name we built flat rep
}

/**
 * save a chess game. The key will be it's name
 * @param game  the game to save
 */
function saveGame(game: ExampleGame): void
{
  //save the game
  putChessThingLocal(game.name, game);
}

/**
 * save a chess repertoire line. The key will be it's name
 * @param line the line to save
 */
function saveLine(line: RepertoireLine): void
{
  //save the line
  putChessThingLocal(line.name, line);
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

  //get the JSONString from local sto\rage
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
  const gameObj = JSON.parse(JSONStr) as gameJSON;

  return loadGameFromJSON(gameObj);
}

/**
 * load a game from JSON object
 * @param gameJSON the gameJSON to parse into an ExampleGame
 * @returns parsed ExampleGame
 */
function loadGameFromJSON(gameJSON: gameJSON): ExampleGame
{
  if(gameJSON.name_key == null)
  {
    throw error("loadGame: name_key null, studyURL: " + gameJSON.studyURL)
  }
  if(gameJSON.studyURL == null)
  {
    throw error("loadGame: studyURL null, name_key: " + gameJSON.name_key);

  }
   //return new ExampleGame with saved properties
  return new ExampleGame(gameJSON.name_key, gameJSON.studyURL);
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

/**
 * create a RepertoireLine from lineJSON
 * @param lineJSON the JSON of this line
 * @returns loaded RepertoireLine
 */
function loadLineFromJSON(lineJSON:lineJSON):RepertoireLine
{
  if(lineJSON.name_key == null || lineJSON.studyURL == null)
  {
    throw error("loadLineFromJSON err: lineJSON.name = " + lineJSON.name_key + " lineJSON.studyURL = " + lineJSON.studyURL);
  }

  //make a new rep line
  const line = new RepertoireLine(lineJSON.name_key, lineJSON.studyURL);

  line.createLineButton();

  //check if we have example games to add to it
  const exGames = lineJSON.exampleGameKeys;

  console.log("loadLineFromJson( " + JSON.stringify(lineJSON) + " )")

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
    throw error("save-controller loadRep(): key we got is null.");
  }

  //get the rep JSON string from local storage
  const JSONstr = getLocal(key);

  //parse it
  const rep = loadRepFromJSONstr(JSONstr);

  //for all the lines, completely load them. that means line buttons and exGames
  for(let x = 0; x < rep.lineList.length; x++)
  {
    const line = loadLine(rep.lineList[x].name);
    //create the line btn
    line.createLineButton();

    //for each game, load that game
    for(let i = 0; i < line.exampleGames.length; i++ )
    {
      const game = line.exampleGames[i];
      game.createGameButton();
    }
  }

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

/**
 * get a Repertoire from JSON object
 * @param repObj repJSON object
 * @returns a Repertoire fully parsed from the repJSON
 */
function loadRepFromJSON(repObj: repJSON):Repertoire
{
  //get the repertoire static characteristics
  const name = repObj.name_key;
  const studyURL = repObj.studyURL;
  const lineKeys = repObj.lineKeys;

  const lines = Array<RepertoireLine>();
  lineKeys.forEach(key => {
    lines.push(loadLine(key)); //load all lines in this rep from it's keys
  });

  const rep = new Repertoire(name, studyURL, lines);

  return rep;
}
/**
 * rebuild the repertoire list from local storage
 * @param repListStr the string loaded from LS with the rep names
 * @returns the rebuilt Repertoire Array
 */
function rebuildRepList(repListStr: string): Array<Repertoire>
{
  const loadedRepList: Array<Repertoire> = [];
  //parse the repListStr into an array of rep names/keys
  const repArrayLS: Array<string> = JSON.parse(repListStr);

  console.log("rebuildRepList parsed list: " + repArrayLS.toString());

  console.log("rebuildRepList (should come next):");
  //iterate through the list of keys,
  //and  load the corresponding reps to rebuild the saved repList
  try
  {
    repArrayLS.forEach(repName =>
    {
      console.log("rebuildRepList(): Rep Name:" + repName);
      const rep = loadRep(repName);
      console.log("rep: " + rep);
      loadedRepList.push(rep);
    });
  }
  catch (error)
  {
    console.log("load failure." + error);
  }

  return loadedRepList;
}



/**
 * save repertoire keys/names so the state of the
 * controller can be reconstructed from the save
 */
export function save(): void
{
  const repKeys = new Array<string>;
  controller.repList.forEach(rep => {
    //save each rep
    saveRep(rep);
    repKeys.push(rep.name);
  });

  //create a stringified version of the repKeys
  const strRepKeys = JSON.stringify(repKeys);
  console.log("repKeys: " + strRepKeys);

  //put the repKeys under key REPKEYS
  localStorage.setItem(REPKEYS, strRepKeys);

  alert("saved.");
}

/**
 * load save into a Controller and return it.
 * @returns Controller made.
 */
export function load(): Controller
{
  console.log("================ load() entered  =======================");
  // get the main save data from local storage
  let repListSave:string;
  try
  {//try to get save data, if fails it returns false
    repListSave = getLocal(REPKEYS);
    console.log("=== repList from LS ===");
    console.log("repListSave: " + repListSave);

    const repList: Array<Repertoire> = rebuildRepList(repListSave); //repListSave is a str
    console.log("save after parsing: " + repList.toString());

    const madeController = new Controller(repList); //the rest of the loading will occur in the Controller

    return madeController;
  }
  catch (error)
  {//if there in no data successful loaded
    console.log("No save loaded. when we tried to fetch we got: " + error);
  }
  //if not...
  return new Controller();
}
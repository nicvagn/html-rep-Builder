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
import { controller } from "./index.js";
import { ExampleGame } from "./example-game.js";
import { RepertoireLine } from "./repertoire-line.js";
import { MAIN } from "./index.js"

// $$$$$$$$$$$$$$$$$$$$ types $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//type chessThingJSON = lineJSON | repJSON | gameJSON;
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

  //for all the lines, load them
  for(let x = 0; x < rep.lineList.length; x++)
  {
    loadLine(rep.lineList[x].name);
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

    for( let x = 0; x < repArrayLS.length; x++ )
    {
      console.log( "rebuildRepList(): Rep Name:" + repArrayLS[x] );
      const rep = loadRep( repArrayLS[x] );
      console.log( "rep: " + rep );
      loadedRepList.push( rep );
      console.log(rep.repertoireBtn);
    }
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
 * Only one save can be in browser, this clears LS
 * and set's the new save
 */
export function save(): void
{
  //clear local storage, only one save can be saved to browser at a time
  localStorage.clear();

  const main = new Array<string>;
  controller.repList.forEach(rep => {
    //save each rep
    saveRep(rep);
    main.push(rep.name);
  });

  //create a stringified version of the MAIN
  const strMain = JSON.stringify(main);
  console.log("MAIN: " + strMain);

  //put the MAIN under key MAIN
  localStorage.setItem(MAIN, strMain);

  alert("Saved. This save is to the browser you are using.");
}

/**
 * load save into the controller.
 * @returns Controller made.
 */
export function load(): void
{
  console.log("================ load() entered =======================");
  // get the main save data from local storage
  let repListSave:string;
  try
  {
    //try to get save data, if fails it returns false
    repListSave = getLocal(MAIN);
    console.log("=== repList from LS ===");
    console.log("repListSave: " + repListSave);

    const repList: Array<Repertoire> = rebuildRepList(repListSave); //repListSave is a str
    console.log("save after parsing: " + repList.toString());

    controller.loadRepList( repList ); //the rest of the loading will occur in the Controller
  }
  catch (error)
  {//if there in no data successful loaded
    console.log("No save loaded. when we tried to fetch we got: " + error);
  }
}

/**
 * load from a json file provided by file input.
 * @param save the save file, containing save JSON
 * @returns true if successful loaded else false
 */
export async function loadFromFile(save: File): Promise<boolean>
{
  if( !confirm("This will overwrite current repertoires. Continue?") )
  {
    console.log("load from file canceled.")
    return false;
  }

  let saveJSON; //for the save
  const fileText = await save.text();
  console.log("file text: " + fileText);
  try //to parse the gotten save, and set the local storage values accordingly
  {
    saveJSON = JSON.parse(fileText);
    for (const [key, value] of Object.entries(saveJSON))
    {
      try
      {
        const currentValue = getLocal(key);
        console.log("old value: " + currentValue)
      }
      catch ( error )
      {
        console.log("nothing found under key: " + key)
      }
      console.log("new value: setting: key-"+ key + " value-" + value);
      localStorage.setItem(key, value as string);
    }
  }
  catch( error )
  {
    alert("File parse failure, error: " + error)
    return false;
  }

  console.log("file text parsed as " + JSON.stringify(saveJSON));

  load();  //load the save from LS into controller

  //update the rep lists
  controller.updateRepList();
  controller.updateOpenRepLists();
  return true;
}

/**
 * prepare a download of the repList, containing all the reps
 */
export function download(): void
{
  //stringify LS
  const LS = JSON.stringify(localStorage);
  //create blob
  const LSBlob = new Blob([LS], { type: 'application/json' });

  const fileName = "repertoires.json";

  //download by creating an <a> and clicking it
  fetch(URL.createObjectURL(LSBlob), { method: 'get', mode: 'no-cors', referrerPolicy: 'no-referrer' })
    .then(() => {
      const aElement = document.createElement('a');
      aElement.setAttribute('download', fileName);
      //create a URL whatever that is
      const href = URL.createObjectURL(LSBlob);
      aElement.href = href;
      // aElement.setAttribute('href', href);
      aElement.setAttribute('target', '_blank');
      aElement.click();
      URL.revokeObjectURL(href);
      aElement.remove();
    });
}
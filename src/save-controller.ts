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
//import { controller } from "./index.js";
import { Repertoire } from "./repertoire.js";




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
 * @returns the retrieve item in json
 */
export function getFromLocal(key: string): void
{
  //try to grab element tied to the key
  const grab = localStorage.getItem(key);

  if (grab != null) {
    return JSON.parse(grab);
  } else {
    throw Error("Retried obj null. Do we have the right key? key used: " + key);
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
export function save(): void
{
  console.log("save does nothing");
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
*
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
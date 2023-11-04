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

import { ExampleGame } from "./example-game.js";
import { PGN } from "./chess-notation.js"

/**
 * a chess repertoire line. It's primary use is in a rep builder GUI, so it needs to have a visual
 * component
 */
export class RepertoireLine extends HTMLButtonElement {

  name: string;
  pgn: string; //main pgn of the line
  exampleGames?: [ExampleGame];

  /**
   * construct a new repertoire line
   * @param {string} name the name of the line
   */
  constructor(name: string, exampleGames?: [ExampleGame]) {

    super();
    this.name = name;
    this.pgn = "";

    if (exampleGames != undefined) {
      //if there is a value for exampleGames
      this.exampleGames = exampleGames;
    }
  }

  /**
   * reset the gameList to undefined
   */
  public resetGames() {

    if (this.exampleGames == undefined) {
      return; // if game list is already undefined
    }
    if (confirm("reset games?")) {
      //confirm reset games
      //make the example games list undefined again
      this.exampleGames = undefined;
    }
  }

  /**
   * create a game and add it to this repertoire object
   * @param {string} gameName the name to give to this game
   * @param {PGN} pgn pgn of the game
   */
  public addGame(gameName: string, pgn: PGN) {

    //create new example game with pgn
    let game = new ExampleGame(gameName, pgn);

    if (this.exampleGames == undefined) {
      this.exampleGames = [game];
    } else {
      this.exampleGames.push(game);
    }

    /*
    /create a new element of the type "example-game"
    let repGame = document.createElement("example-game");
    /set class
    repGame.setAttribute("class", "repGame");
    /set the custom attribute data-url, the url of the lichess study
    repGame.setAttribute("data-url", pgn);
    repGame.innerHTML = gameName;
    /create a new example game with th url and name
    listItem.innerHTML = '<example-game class="exampleGame" onclick="changeBoard(this)" data-url=' + url + '>' + game_name + '</example-game>';
    /add the game to the repertoire
    this.exampleGames.appendChild(listItem);*/
  }
}
"use strict";
/* a js chess repertoire including lines and example games made for shcc
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repertoire = void 0;
/**
 * A chess repertoire
 */
var Repertoire = /** @class */ (function () {
    /**
     * make a new Rep
     * @param {string} _name name to give
     * @param {*} _lineList list of lines in this rep
     * @param {*} _gameList list of instructive games
     */
    function Repertoire(_name, _lineList, _gameList) {
        console.log("rep with name, lineList, gameList made");
        this.name = _name;
        //set the game and line list to the ones provided to the constructor
        this.gameList = _gameList;
        this.lineList = _lineList;
    }
    /**
     * make a Repertoire with only a name
     * @param {string} name the rep nama
     * @returns a Repertoire with a name and nothing else
     */
    Repertoire.repertoireOnlyName = function (name) {
        console.log("rep with only name called");
        return new Repertoire(name, [], []);
    };
    /**
     * show add game popup to add a game to this line
     */
    Repertoire.prototype.showAddGame = function () {
        var windowFeatures = "width=320,height=320,popup";
        popUp = window.open("AddGame.html", "mozillaWindow", windowFeatures);
    };
    /**
     * show the add line popup to add a game to this line
     */
    Repertoire.prototype.showAddLine = function () {
        var windowFeatures = "width=320,height=320,popup";
        popUp = window.open("AddLine.html", "mozillaWindow", windowFeatures);
    };
    /**
     * add a game to this repertoire object
     * @param {string} gameName the name to give to this game
     * @param {string} url lichess embedded study link
     */
    Repertoire.prototype.addGame = function (gameName, url) {
        //create a new element of the type "example-game"
        var repGame = document.createElement("example-game");
        //set class
        repGame.setAttribute("class", "repGame");
        //set the custom attribute data-url, the url of the lichess study
        repGame.setAttribute("data-url", url);
        repGame.innerHTML = gameName;
        //create a new example game with th url and name
        listItem.innerHTML = '<example-game class="exampleGame" onclick="changeBoard(this)" data-url=' + url + '>' + game_name + '</example-game>';
        //add the game to the repertoire
        this.gameList.appendChild(listItem);
    };
    /**
     * add a line to this repertoire object
     * @param {string} lineName the name to give to this line
     * @param {string} url lichess embedded study link
     */
    Repertoire.prototype.addLine = function (lineName, url) {
        //create a new element of the type "rep-line"
        var repLine = document.createElement("rep-line");
        //set class
        repLine.setAttribute("class", "repLine");
        //set the custom attribute data-url, the url of the lichess study
        repLine.setAttribute("data-url", url);
        repLine.innerHTML = lineName;
        //add to the list of lines
        this.lineList.appendChild(repLine);
    };
    /**
     * reset the lines to a new ul
     */
    Repertoire.prototype.resetLines = function () {
        if (confirm("reset lines?")) { //confirm reset lines
            //get the line column
            var lineColumn = document.getElementById("lineColumn");
            //remove the old lines ul from the html doc
            this.lineList.remove();
            //create a new ul and set the id
            this.lineList = document.createElement('ul');
            this.lineList.setAttribute('id', 'lineList');
            //add the newly created line list to the line column
            lineColumn.appendChild(lineList);
        }
    };
    /**
     * set the example games to an empty ul
     */
    Repertoire.prototype.resetGames = function () {
        if (confirm("reset games?")) { //confirm reset games
            //get the game column
            var gameColumn = document.getElementById("gameColumn");
            //remove the old lines ul from the html doc
            this.gameList.remove();
            //create a new ul and set the id
            this.gameList = document.createElement('ul');
            this.gameList.setAttribute('id', 'lineList');
            //add the newly created line list to the line column
            gameColumn.appendChild(lineList);
        }
    };
    /**
     * save this rep
     */
    Repertoire.prototype.saveRep = function () {
        //convert rep to json string
        var stringify_rep = AddToLocalStorage(this);
        //put the rep in local storage with it's key being it's name
        localStorage.setItem(stringify_rep, this.name);
    };
    return Repertoire;
}());
exports.Repertoire = Repertoire;

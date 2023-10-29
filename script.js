/*
    Created for Saskatchewan Horizon Chess Club by Nicolas Vaagen

    This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
*/

var openRep = newRep; //the currently open rep

class ExampleGame extends HTMLButtonElement {

  constructor(){
    super(this.innerHTML);
    this.addEventListener('click', changeBoard(this));
  }
}

class RepLine extends HTMLButtonElement {

  constructor(){
    super(this.innerHTML);
    this.addEventListener('click', changeBoard(this));
  }
}

class Repertoire {
  name;
  gameList = document.getElementById("gameList");
  lineList = document.getElementById("lineList");
}

//if the custom elements are not defined, def. them
if (!customElements.get('example-game')) {
  customElements.define('example-game', ExampleGame, { extends: "button"});
}
if (!customElements.get('rep-line')) {
  customElements.define('rep-line', RepLine, { extends: "button"});
}

//make a new rep
function newRep(){

  //the open rep
  openRep = new Repertoire();

  let name = prompt("Enter the name you would like to give this Repertoire.");

  if (name != null){
    openRep.name = name;
  }
  else
  {
    openRep.name = Math.random().toString(36).slice(2, 7);
  }
}

//open a rep from local storage
function openRep(repName){

  openRep = GetFromLocalStorage(repName);
}

//change the src for the chess board
function changeBoard(element) {

  //get the mainBoard
  let mainBoard = document.getElementById("board");
  //get SRC from the html tag "data-url"
  const SRC = element.dataset.url;
  mainBoard.src = SRC;
}

//show add game popup
function showAddGame() {

  const windowFeatures = "left=100,top=100,width=320,height=320,popup";
  popUp = window.open("AddGame.html", "mozillaWindow", windowFeatures);
}

function showAddLine() {

  const windowFeatures = "left=100,top=100,width=320,height=320,popup";
  popUp = window.open("AddLine.html", "mozillaWindow", windowFeatures);
}

//box type is a string so we can tell the input box this came from
function getTextFromPop(event) {

  let url = document.getElementById("lichessURL").value;
  let name = document.getElementById('name').value;

  if(boxType == "addGame"){
    console.log("add Game");

    //call function to add game
    addGame(name, url);
  }
  else if(boxType == "addLine") {
    console.log("add line");

    //call function to add line
    addLine(name, url);
  }
  else {
    alert("Unknown box type");
  }
}


//add game to ul of games
function addGame(game_name, url){

  const anchor = opener.document.getElementById("gameList");
  let listItem = document.createElement("li");

  //create a new example game with th url and name
  listItem.innerHTML = '<example-game class="exampleGame" onclick="changeBoard(this)" data-url='+ url +'>' + game_name +'</example-game>';

  //add the li to the gameList
  anchor.appendChild(listItem);

  //add the game to the repertoire
  openRep.exampleGames.push(listItem);
}

//add game to ul of lines
function addLine(line_name, url){

  const anchor = opener.document.getElementById("lineList");
  let listItem = document.createElement("li");

  //create a new example game with th url and name
  listItem.innerHTML = '<rep-line class="line" onclick="changeBoard(this)" data-url='+ url +' >' + line_name + '</rep-line>';

  //add the li to the gameList
  anchor.appendChild(listItem);

  //add the line to the repertoire
  openRep.exampleGames.push(listItem);
}

//reset the lines on the open rep
function resetLines(){

  if(openRep != null){
    openRep.exampleLines = [];
  }
}

function resetGames(){

  if(openRep != null && confirm("reset games?")){
    openRep.exampleGames = [];
  }
}

function saveRep(rep){

  let stringify_rep =  AddToLocalStorage(rep);

  localStorage.setItem(stringify_rep, rep.name);

}

// this function converts JSON into string to be entered into localStorage
function AddToLocalStorage(data) {

  if (typeof data != "string") {data = JSON.stringify(data);}
  return data;
}

// this function gets string from localStorage and converts it into JSON
function GetFromLocalStorage(key) {

  return JSON.parse(localStorage.getItem(key));
}

// A global variable should be defined to hold the URL for the file to be downloaded
// This is good practice as if many links are being generated or the link is being regularly updated, you don't want to be creating new variables every time, wasting memory
var textFileUrl = null;
// Function for generating a text file URL containing given text
function generateTextFileUrl(txt) {

    let fileData = new Blob([txt], {type: 'text/plain'});
    // If a file has been previously generated, revoke the existing URL
    if (textFileUrl !== null) {
        window.URL.revokeObjectURL(textFile);
    }
    textFileUrl = window.URL.createObjectURL(fileData);
    // Returns a reference to the global variable holding the URL
    // Again, this is better than generating and returning the URL itself from the function as it will eat memory if the file contents are large or regularly changing
    return textFileUrl;
};

// Generate the file download URL and assign it to the link
// Wait until the page has loaded! Otherwise the download link element will not exist
function show_download(){

  let downloadLink = getElementById('downloadLink');
  downloadLink.document.getElementById(id).style.visibility = "visible";
  window.addEventListener("load", function(){
    downloadLink.href = generateTextFileUrl(openRep);
  });
}
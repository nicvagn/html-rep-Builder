/*
    Created for Saskatchewan Horizon Chess Club by Nicolas Vaagen

    This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
/*


//change the src for the chess board
function changeBoard(element) {
  //get the mainBoard
  let mainBoard = document.getElementById("board");
  //get SRC from the html tag "data-url"
  const SRC = element.dataset.url;
  mainBoard.src = SRC;
}

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

//if the custom elements are not defined, def. them
if (!customElements.get('example-game')) {
  customElements.define('example-game', ExampleGame, { extends: "button"});
}
if (!customElements.get('rep-line')) {
  customElements.define('rep-line', RepLine, { extends: "button"});
}


//show add game popup
function showAddGame() {
  const windowFeatures = "left=100,top=100,width=320,height=320,popup";
  window.open("AddGame.html", "mozillaWindow", windowFeatures);
}

function showAddLine() {
  const windowFeatures = "left=100,top=100,width=320,height=320,popup";
  window.open("AddLine.html", "mozillaWindow", windowFeatures);
}

//box type is a string so we can tell the input box this came from
function getTextFromPop(boxType) {

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

  window.self.close();
}


//add game to ul of games
function addGame(game_name, url){
  const anchor = opener.document.getElementById("gameList");
  let listItem = document.createElement("li");

  //create a new example game with th url and name
  listItem.innerHTML = '<example-game class="exampleGame" onclick="changeBoard(this)" data-url='+ url +'>' + game_name +'</example-game>';

  //add the li to the gameList
  anchor.appendChild(listItem);
}

//add game to ul of lines
function addLine(line_name, url){
  const anchor = opener.document.getElementById("lineList");
  let listItem = document.createElement("li");

  //create a new example game with th url and name
  listItem.innerHTML = '<rep-line class="line" onclick="changeBoard(this)" data-url='+ url +' >' + line_name + '</rep-line>';

  //add the li to the gameList
  anchor.appendChild(listItem);
}
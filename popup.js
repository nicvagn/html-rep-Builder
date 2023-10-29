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
}
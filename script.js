let buttons = document.querySelector('button');
let urlEE = "https://lichess.org/study/embed/okZJcfZb/5JWAfEdt"


//change the src for the chess board
function changeBoard(element) {
  const SRC = element.dataset.url;
  document.getElementById("board").src = SRC;
}

class ExampleGame extends HTMLButtonElement {
  constructor(){
    super(this.innerHTML);
    this.addEventListener('click', changeBoard(this))
  }
  getURL() {
    alert("game");
  }
}

class Line extends HTMLButtonElement {
  constructor(){
    super(this.innerHTML);
    this.addEventListener('click', changeBoard(this))
  }
  getURL(){
    alert("line");
  }
}

customElements.define("ExampleGame", { extends: "button"});
customElements.define("Line", { extends: "button"});


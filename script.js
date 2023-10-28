let mainBoard = 

//change the src for the chess board
function changeBoard(element) {
  //get SRC from the html tag "data-url"
  const SRC = element.dataset.url;
  mainBoard.src = SRC;
}

class ExampleGame extends HTMLButtonElement {
  constructor(){
    super(this.innerHTML);
    this.addEventListener('click', changeBoard(this))
  }
}

class Line extends HTMLButtonElement {
  constructor(){
    super(this.innerHTML);
    this.addEventListener('click', changeBoard(this))
  }
}

customElements.define("ExampleGame", { extends: "button"});
customElements.define("Line", { extends: "button"});


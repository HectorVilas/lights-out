const board = document.querySelector(".board");
let moves = 0;

let boardSize = 10;

//buttons and actions
const btnRandom = document.querySelector(".randomLevel");
btnRandom.addEventListener("click", () =>{
  toggleButtons()
  randomizeLights();
});

const btnNewGame = document.querySelector(".newGame");
btnNewGame.addEventListener("click", () => toggleButtons());

const btnCancel = document.querySelector(".cancel");
btnCancel.addEventListener("click", () => toggleButtons());

//////////

drawBoard()



//adding actions to each tile
const tiles = document.querySelectorAll(".tile");
tiles.forEach(tile => {
  tile.addEventListener("click", () => {
    toggleLights(tile.getAttribute("x"),tile.getAttribute("y"));
    movesCount();
  });
});

//FUNCTIONS

function drawBoard(){
  for(let i = 0; i < boardSize; i++){
    const row = document.createElement("div");
    row.className = `row ${i}`;
    board.appendChild(row);
    for(let j = 0; j < boardSize; j++){
      const tile = document.createElement("div");
      tile.className = `tile`;
      tile.setAttribute("x",`${j}`);
      tile.setAttribute("y",`${i}`);
      row.appendChild(tile);
    }
  }
}

function toggleLights(x,y){
  let tileCenter = document.querySelector(`[x="${x}"][y="${y}"]`);
  let tileN = undefined;
  if(y-1 >= 0 && y-1 <= boardSize-1){
    tileN = document.querySelector(`[x="${x}"][y="${y-1}"]`);
  };
  let tileS = undefined;
  if(parseInt(y)+1 >= 0 && parseInt(y)+1 <= boardSize-1){
    tileS = document.querySelector(`[x="${x}"][y="${parseInt(y)+1}"]`);
  };
  let tileE = undefined;
  if(parseInt(x)+1 >= 0 && parseInt(x)+1 <= boardSize-1){
    tileE = document.querySelector(`[x="${parseInt(x)+1}"][y="${y}"]`);
  }
  let tileW = undefined;
  if(x-1 >= 0 && x-1 <= boardSize-1){
    tileW = document.querySelector(`[x="${x-1}"][y="${y}"]`);
  }

  [tileCenter, tileN, tileS, tileE, tileW].forEach(t => {
    if(t !== undefined){
      t.classList.toggle("active");
    }
  });
  playSound()
}

function randomizeLights(){
  movesCount("reset");
  for(i = 0; i < 30; i++){
    setTimeout( () => {
      toggleLights(Math.floor(Math.random()*boardSize),
      Math.floor(Math.random()*boardSize));
    }, 75 * (i*(i/20)));
  }
}

function playSound(){
  const soundSwitch = document.querySelector("#switchSound");
  soundSwitch.currentTime = 0;
  soundSwitch.play();
}

function toggleButtons(){
  const mainButtons = document.querySelector(".mainButtons");
  const hiddenNewGame = document.querySelector(".gameModeOptions");
  mainButtons.classList.toggle("hidden");
  hiddenNewGame.classList.toggle("hidden");
}

function movesCount(action){
  const move = document.querySelector(".displayMoves");
  if(action == "reset"){
    moves = 0;
    move.innerText = moves;
  } else {
    moves++;
    move.innerText = moves;
  }
}
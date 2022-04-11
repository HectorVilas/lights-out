const board = document.querySelector(".board");
let tiles = document.querySelectorAll(".tile");
let moves = 0;
let gameMode = "Sandbox";
let level = 0;
let boardSize = 10;
let gameOver = true;

//starting the game
drawBoard();
actionToTiles()
displayGameMode("Sandbox");
displayMoves("reset");


//buttons and actions
const btnNewGame = document.querySelector(".newGame");
btnNewGame.addEventListener("click", () => {
  toggleMenu("modes");
});
const btnRandom = document.querySelector(".randomMode");
btnRandom.addEventListener("click", () =>{
  toggleMenu("main", "board");
  newGame("Random");
});
const btnCancel = document.querySelectorAll(".cancel");
btnCancel.forEach(btn => btn.addEventListener("click", () => toggleMenu("main", "board")));
const btnSandbox = document.querySelector(".sandboxMode");
btnSandbox.addEventListener("click", () => {
  toggleMenu("main", "board");
  newGame("Sandbox");
});
const btnHowToPlay = document.querySelector(".howToPlay");
btnHowToPlay.addEventListener("click", () => toggleMenu("how"));
const btnAbout = document.querySelector(".about");
btnAbout.addEventListener("click", () => toggleMenu("about"));
const btnNormalLevels = document.querySelector(".NormalLevelsSelect");
btnNormalLevels.addEventListener("click", () => {
  toggleMenu("modes", "normal");
});

//FUNCTIONS

function newGame(newGameMode,level){
  removeBoard();
  if(level !== undefined){
    boardSize = levelsNormalMode[level].gridSize;
    gameOver = false;
  } else {
    boardSize = 10;
  };
  drawBoard();
  drawLevel(level);
  displayMoves("reset");
  displayGameMode(newGameMode);
  if(newGameMode == "Random"){
    randomizeLights();
    gameOver = false;
  };
  actionToTiles();
  toggleMenu("main");
};

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
    };
  };
  //reasigning value to prevent error
  tiles = document.querySelectorAll(".tile");
};

function clearBoard(){
  tiles.forEach(tile => {
    tile.classList.remove("active");
  });
  displayMoves("reset");
  toggleMenu("main");
};

function removeBoard(){
  while(board.hasChildNodes()){
    board.removeChild(board.firstChild);
  };
};

function actionToTiles(){
  tiles.forEach(tile => {
    tile.addEventListener("click", () => {
      toggleLights(tile.getAttribute("x"),tile.getAttribute("y"));
      displayMoves();
      checkWinCondition();
    });
  });
};


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
  };
  let tileW = undefined;
  if(x-1 >= 0 && x-1 <= boardSize-1){
    tileW = document.querySelector(`[x="${x-1}"][y="${y}"]`);
  };

  [tileCenter, tileN, tileS, tileE, tileW].forEach(t => {
    if(t !== undefined){
      t.classList.toggle("active");
    };
  });
  playSound();
};

function randomizeLights(){
  for(i = 0; i < 30; i++){
    setTimeout( () => {
      if(gameMode == "Random"){
        toggleLights(Math.floor(Math.random()*boardSize),
        Math.floor(Math.random()*boardSize));
        displayMoves("reset");}
    }, 75 * (i*(i/20)));
  }
  gameOver = false;
}

function playSound(){
  const soundSwitch = document.querySelector("#switchSound");
  soundSwitch.currentTime = 0;
  soundSwitch.play();
}

function toggleMenu(menu, screen){
  const MenuMainButtons = document.querySelector(".divMainButtons");
  const MenuNewGame = document.querySelector(".divGameModeOptions");
  const menuHowToPlay = document.querySelector(".divHowToPlay");
  const menuAbout = document.querySelector(".divAbout");

  let menus = [MenuMainButtons,MenuNewGame,menuHowToPlay,menuAbout];
  let menuKeep;
  
  menu == "main" ? menuKeep = MenuMainButtons :
  menu == "modes" ? menuKeep = MenuNewGame :
  menu == "how" ? menuKeep = menuHowToPlay :
  menu == "about" ? menuKeep = menuAbout : alert("error");

  menus.forEach(item => item.classList.add("hidden"));
  menuKeep.classList.remove("hidden");

  if(screen !== undefined){
    const screenLevelsNormal = document.querySelector(".normalModeLevels"); 
    
    let screens = [board, screenLevelsNormal];
    let screenKeep;

    screen == "board" ? screenKeep = board :
    screen == "normal" ? screenKeep = screenLevelsNormal : alert("error");

    screens.forEach(item => item.classList.add("hidden"));
    screenKeep.classList.remove("hidden");
  };
};

function checkWinCondition(){
  if(!gameOver){
    let remaining = 0;
    tiles.forEach(t => {
      if(t.classList.contains("active")){
        remaining++;
      };
    });
    if(remaining == 0){
      gameOver = true;
      alert(`You won! with ${moves} moves!
      temporal win message on prompt, sorry`)
    };
  };
};

//display functions

function displayMoves(action){
  const move = document.querySelector(".displayMoves");
  if(action == "reset"){
    moves = 0;
    move.innerText = moves;
  } else {
    moves++;
    move.innerText = moves;
  };
};

function displayGameMode(newMode){
  const mode = document.querySelector(".displayGamemode");
  gameMode = newMode;
  mode.innerText = newMode;
};

function displayLevel(){
  const levelDisplay = document.querySelector(".displayLevel");
  levelDisplay.innerText = level;
};

///////////////////// test area /////////////////////

const levelsNormalMode = [
  {gridSize: 7, design: [[3,2],[2,3],[3,3],[4,3],[3,4]]},
  {gridSize: 10, design: [[3,6],[5,2],[8,1],[8,6],[9,2],[5,5],[3,3],[4,4],[6,8],[3,1]]},
];

function drawLevel(l){
  if(l !== undefined){
    levelsNormalMode[l].design.forEach(t => {
      let thisTile = document.querySelector(`[x="${t[0]}"][y="${t[1]}"]`);
      thisTile.classList.add("active");
    });
    level = l+1;
  } else {
    level = 0;
  };
  displayLevel(l);
};
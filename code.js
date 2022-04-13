const board = document.querySelector(".board");
let tiles = document.querySelectorAll(".tile");
let moves = 0;
let gameMode = "Sandbox";
let level = 0;
let boardSize = 10;
let gameOver = true;

const levelsNormalMode = [
  {gridSize: 5, design: [[2,1],[1,2],[2,2],[3,2],[2,3]]},
  {gridSize: 5, design: [[2,0],[0,2],[2,2],[4,2],[2,4]]},
  {gridSize: 5, design: [[0,0],[1,0],[2,0],[3,0],[4,0],[0,1],[2,1],[4,1],[0,2],[1,2],[3,2],[4,2],[0,3],[2,3],[4,3],[0,4],[1,4],[2,4],[3,4],[4,4]]},
  {gridSize: 7, design: [[0,0],[3,0],[6,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[0,2],[6,2],[0,3],[2,3],[3,3],[4,3],[6,3],[0,4],[6,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[0,6],[3,6],[6,6]]},
  {gridSize: 7, design: [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[0,1],[2,1],[3,1],[4,1],[6,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[0,5],[2,5],[3,5],[4,5],[6,5],[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]]},
  {gridSize: 7, design: [[1,0],[5,0],[0,1],[3,1],[6,1],[0,2],[2,2],[3,2],[4,2],[6,2],[0,3],[1,3],[2,3],[4,3],[5,3],[6,3],[0,4],[2,4],[3,4],[4,4],[6,4],[0,5],[3,5],[6,5],[1,6],[5,6]]},
  {gridSize: 7, design: [[0,0],[2,0],[4,0],[6,0],[0,1],[1,1],[3,1],[5,1],[6,1],[1,2],[3,2],[5,2],[2,3],[4,3],[1,4],[3,4],[5,4],[0,5],[1,5],[3,5],[5,5],[6,5],[0,6],[2,6],[4,6],[6,6]]},
  {gridSize: 7, design: [[1,0],[5,0],[3,1],[2,2],[3,2],[4,2],[0,4],[1,4],[2,4],[4,4],[5,4],[6,4],[0,5],[6,5],[2,6],[4,6]]},
  {gridSize: 9, design: [[0,0],[4,0],[8,0],[1,1],[3,1],[4,1],[5,1],[7,1],[2,2],[4,2],[6,2],[1,3],[3,3],[5,3],[7,3],[0,4],[1,4],[2,4],[6,4],[7,4],[8,4],[1,5],[3,5],[5,5],[7,5],[2,6],[4,6],[6,6],[1,7],[3,7],[4,7],[5,7],[7,7],[0,8],[4,8],[8,8]]},
  {gridSize: 9, design: [[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[2,3],[3,3],[4,3],[5,3],[6,3],[1,4],[2,4],[4,4],[6,4],[7,4],[2,5],[3,5],[4,5],[5,5],[6,5],[2,6],[3,6],[5,6],[6,6],[3,7],[4,7],[5,7],[3,8],[4,8],[5,8]]},
  {gridSize: 9, design: [[1,0],[2,0],[4,0],[6,0],[7,0],[0,1],[4,1],[8,1],[0,2],[2,2],[6,2],[8,2],[3,3],[5,3],[0,4],[1,4],[7,4],[8,4],[3,5],[5,5],[0,6],[2,6],[6,6],[8,6],[0,7],[4,7],[8,7],[1,8],[2,8],[4,8],[6,8],[7,8]]},
  {gridSize: 10, design: [[2,0],[4,0],[5,0],[7,0],[0,1],[3,1],[6,1],[9,1],[1,2],[2,2],[7,2],[8,2],[0,3],[3,3],[6,3],[9,3],[1,4],[2,4],[4,4],[5,4],[7,4],[8,4],[0,5],[2,5],[7,5],[9,5],[0,6],[3,6],[4,6],[5,6],[6,6],[9,6],[2,7],[7,7],[0,8],[1,8],[4,8],[5,8],[8,8],[9,8],[3,9],[6,9]]},
  {gridSize: 10, design: [[0,0],[1,0],[2,0],[7,0],[8,0],[9,0],[1,1],[3,1],[4,1],[5,1],[6,1],[8,1],[2,2],[7,2],[1,3],[8,3],[0,4],[2,4],[3,4],[6,4],[7,4],[9,4],[1,5],[8,5],[0,6],[4,6],[5,6],[9,6],[0,7],[2,7],[7,7],[9,7],[2,8],[4,8],[5,8],[7,8],[0,9],[2,9],[7,9],[9,9]]},
  {gridSize: 11, design: [[1,0],[2,0],[3,0],[7,0],[8,0],[9,0],[4,1],[6,1],[0,2],[2,2],[8,2],[10,2],[1,3],[3,3],[5,3],[7,3],[9,3],[1,4],[2,4],[8,4],[9,4],[0,5],[1,5],[3,5],[5,5],[7,5],[9,5],[10,5],[1,6],[3,6],[7,6],[9,6],[5,7],[0,8],[2,8],[3,8],[4,8],[6,8],[7,8],[8,8],[10,8],[2,9],[4,9],[5,9],[6,9],[8,9],[1,10],[3,10],[5,10],[7,10],[9,10]]},
  {gridSize: 11, design: [[3,0],[7,0],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[1,2],[4,2],[6,2],[9,2],[0,3],[2,3],[3,3],[7,3],[8,3],[10,3],[0,4],[10,4],[0,5],[1,5],[2,5],[4,5],[5,5],[6,5],[8,5],[9,5],[10,5],[0,6],[10,6],[0,7],[2,7],[3,7],[7,7],[8,7],[10,7],[1,8],[4,8],[6,8],[9,8],[2,9],[3,9],[4,9],[5,9],[6,9],[7,9],[8,9],[3,10],[7,10]]},
  // {gridSize: 7, design: []},
  // {gridSize: 7, design: []},
  // {gridSize: 7, design: []},
  // {gridSize: 7, design: []},
  // {gridSize: 7, design: []},
];

//starting the game
drawBoard();
displayGameMode("Sandbox");
displayMoves("reset");
drawNormalModeButtons();

//buttons and actions

const btnNewGame = document.querySelector(".newGame");
btnNewGame.addEventListener("click", () => {
  toggleMenu("modes", "levels");
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

//FUNCTIONS

function newGame(newGameMode,level){
  removeBoard();
  level !== undefined ? boardSize = levelsNormalMode[level].gridSize
  : boardSize = 10;
  gameMode = newGameMode;
  gameMode == "Sandbox" ? gameOver = true : gameOver = false;
  drawBoard();
  drawLevel(level);
  displayMoves("reset");
  displayGameMode(newGameMode);
  newGameMode == "Random" ? randomizeLights()
  : toggleMenu("main");
};

//board related

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

      tile.addEventListener("click", () => {
        toggleLights(tile.getAttribute("x"),tile.getAttribute("y"));
        displayMoves();
        checkWinCondition();
      });

      row.appendChild(tile);
    };
  };
  tiles = document.querySelectorAll(".tile"); //reasigning value to prevent error
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

function toggleLights(x,y){
  let tileCenter = document.querySelector(`[x="${x}"][y="${y}"]`);
  let tileN;
  if(y-1 >= 0 && y-1 <= boardSize-1){
    tileN = document.querySelector(`[x="${x}"][y="${y-1}"]`);
  };
  let tileS;
  if(parseInt(y)+1 >= 0 && parseInt(y)+1 <= boardSize-1){
    tileS = document.querySelector(`[x="${x}"][y="${parseInt(y)+1}"]`);
  };
  let tileE;
  if(parseInt(x)+1 >= 0 && parseInt(x)+1 <= boardSize-1){
    tileE = document.querySelector(`[x="${parseInt(x)+1}"][y="${y}"]`);
  };
  let tileW;
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
        displayMoves("reset");
      };
    }, 75 * (i*(i/20)));
  };
};

function playSound(){
  const soundSwitch = document.querySelector("#switchSound");
  soundSwitch.currentTime = 0;
  soundSwitch.play();
}

function checkWinCondition(){
  if(!gameOver){
    let remaining = 0;
    tiles.forEach(t => {
      if(t.classList.contains("active")){
        remaining++;
      };
    });
    if(remaining == 0){
      const btnCurrentLevel = document.querySelector(`.n${level}`);
      btnCurrentLevel.classList.add("darkened");
      console.log(btnCurrentLevel);
      gameOver = true;
      toggleMenu("main","win");
    };
  };
};

//menu related

function toggleMenu(menu, screen){
  const MenuMainButtons = document.querySelector(".divMainButtons");
  const MenuNewGame = document.querySelector(".GameModes");
  const menuHowToPlay = document.querySelector(".divHowToPlay");
  const menuAbout = document.querySelector(".divAbout");

  let menus = [MenuMainButtons,MenuNewGame,menuHowToPlay,menuAbout];
  let menuKeep;
  
  menu == "main" ? menuKeep = MenuMainButtons
  : menu == "modes" ? menuKeep = MenuNewGame
  : menu == "how" ? menuKeep = menuHowToPlay
  : menu == "about" ? menuKeep = menuAbout
  : alert("error");

  menus.forEach(item => item.classList.add("hidden"));
  menuKeep.classList.remove("hidden");

  if(screen !== undefined){
    const screenLevelsNormal = document.querySelector(".GameModes"); 
    const screenWinMessage = document.querySelector(".winMessage"); 
    
    let screens = [board,screenLevelsNormal,screenWinMessage];
    let screenKeep;

    screen == "board" ? screenKeep = board
    : screen == "levels" ? screenKeep = screenLevelsNormal
    : screen == "win" ? screenKeep = screenWinMessage
    : alert("error");

    screens.forEach(item => item.classList.add("hidden"));
    screenKeep.classList.remove("hidden");
  };
};

//display related

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
  mode.innerText = newMode;
};

function displayLevel(){
  const levelDisplay = document.querySelector(".displayLevel");
  levelDisplay.innerText = level;
};

//levels related

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

function drawNormalModeButtons(){
  const normalModeLevels = document.querySelector(".NormalLevelsList");
  
  for(let i = 0; i < levelsNormalMode.length; i++){
    const button = document.createElement("button");
    button.className = `normalLevel n${i+1}`;
    button.innerText = `Level ${i+1}`;

    button.addEventListener("click", () => {
      newGame("levels", i);
      toggleMenu("main","board");
    });

    normalModeLevels.appendChild(button);
  };
};

//tools for "game dev"

function lightsToArray(){
  let activeLights = [];
  tiles.forEach(t => {
    if(t.classList.contains("active")){
      activeLights.push([parseInt(t.getAttribute("x")),parseInt(t.getAttribute("y"))]);
    };
  });
  console.log("["+activeLights.join("],[")+"]");
};
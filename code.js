const board = document.querySelector(".board");
let tiles = document.querySelectorAll(".tile");
let moves = 0;
let gameMode = "Sandbox";
let level = 0;
let boardSize = 10;
let gameOver = true;

const gameLevels = [
  //pattern style levels
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
  {gridSize: 11, design: [[1,0],[3,0],[7,0],[9,0],[0,1],[10,1],[2,2],[8,2],[0,3],[3,3],[5,3],[7,3],[10,3],[3,5],[5,5],[7,5],[0,7],[3,7],[5,7],[7,7],[10,7],[2,8],[8,8],[0,9],[10,9],[1,10],[3,10],[7,10],[9,10]]},
  {gridSize: 11, design: [[2,0],[8,0],[2,1],[8,1],[0,2],[1,2],[9,2],[10,2],[3,3],[7,3],[3,7],[7,7],[0,8],[1,8],[9,8],[10,8],[2,9],[8,9],[2,10],[8,10]]},
  {gridSize: 13, design: [[4,0],[4,1],[3,2],[6,2],[7,2],[9,2],[2,3],[10,3],[6,4],[11,4],[12,4],[2,5],[2,6],[4,6],[6,6],[8,6],[10,6],[10,7],[0,8],[1,8],[6,8],[2,9],[10,9],[3,10],[5,10],[6,10],[9,10],[8,11],[8,12]]},
  {gridSize: 13, design: [[2,0],[3,0],[9,0],[10,0],[1,1],[4,1],[8,1],[11,1],[0,2],[5,2],[6,2],[7,2],[12,2],[0,3],[12,3],[1,4],[11,4],[2,5],[10,5],[2,6],[10,6],[2,7],[10,7],[1,8],[11,8],[0,9],[12,9],[0,10],[5,10],[6,10],[7,10],[12,10],[1,11],[4,11],[8,11],[11,11],[2,12],[3,12],[9,12],[10,12]]},
  {gridSize: 13, design: [[0,0],[2,0],[3,0],[4,0],[6,0],[8,0],[9,0],[10,0],[12,0],[0,1],[1,1],[5,1],[6,1],[7,1],[11,1],[12,1],[0,2],[2,2],[3,2],[4,2],[6,2],[8,2],[9,2],[10,2],[12,2],[2,3],[10,3],[1,4],[4,4],[8,4],[11,4],[1,5],[3,5],[6,5],[9,5],[11,5],[0,6],[3,6],[5,6],[6,6],[7,6],[9,6],[12,6],[0,7],[2,7],[10,7],[12,7],[2,8],[6,8],[10,8],[1,9],[5,9],[6,9],[7,9],[11,9],[0,10],[1,10],[3,10],[9,10],[11,10],[12,10],[0,11],[5,11],[7,11],[12,11],[2,12],[3,12],[9,12],[10,12]]},
  {gridSize: 13, design: [[0,0],[1,0],[4,0],[5,0],[7,0],[8,0],[11,0],[12,0],[0,1],[3,1],[9,1],[12,1],[2,2],[10,2],[1,3],[4,3],[5,3],[7,3],[8,3],[11,3],[0,4],[3,4],[4,4],[8,4],[9,4],[12,4],[0,5],[3,5],[9,5],[12,5],[0,7],[3,7],[9,7],[12,7],[0,8],[3,8],[4,8],[8,8],[9,8],[12,8],[1,9],[4,9],[5,9],[7,9],[8,9],[11,9],[2,10],[10,10],[0,11],[3,11],[9,11],[12,11],[0,12],[1,12],[4,12],[5,12],[7,12],[8,12],[11,12],[12,12]]},
  {gridSize: 15, design: [[0,0],[1,0],[2,0],[5,0],[6,0],[8,0],[9,0],[12,0],[13,0],[14,0],[0,1],[2,1],[3,1],[4,1],[6,1],[8,1],[10,1],[11,1],[12,1],[14,1],[0,2],[1,2],[3,2],[4,2],[5,2],[7,2],[9,2],[10,2],[11,2],[13,2],[14,2],[1,3],[2,3],[4,3],[5,3],[6,3],[8,3],[9,3],[10,3],[12,3],[13,3],[1,4],[2,4],[3,4],[5,4],[9,4],[11,4],[12,4],[13,4],[0,5],[2,5],[3,5],[4,5],[7,5],[10,5],[11,5],[12,5],[14,5],[0,6],[1,6],[3,6],[11,6],[13,6],[14,6],[2,7],[5,7],[9,7],[12,7],[0,8],[1,8],[3,8],[11,8],[13,8],[14,8],[0,9],[2,9],[3,9],[4,9],[7,9],[10,9],[11,9],[12,9],[14,9],[1,10],[2,10],[3,10],[5,10],[9,10],[11,10],[12,10],[13,10],[1,11],[2,11],[4,11],[5,11],[6,11],[8,11],[9,11],[10,11],[12,11],[13,11],[0,12],[1,12],[3,12],[4,12],[5,12],[7,12],[9,12],[10,12],[11,12],[13,12],[14,12],[0,13],[2,13],[3,13],[4,13],[6,13],[8,13],[10,13],[11,13],[12,13],[14,13],[0,14],[1,14],[2,14],[5,14],[6,14],[8,14],[9,14],[12,14],[13,14],[14,14]]},
  {gridSize: 15, design: [[3,0],[4,0],[6,0],[7,0],[8,0],[10,0],[11,0],[0,1],[2,1],[4,1],[7,1],[10,1],[12,1],[14,1],[3,2],[11,2],[4,3],[6,3],[7,3],[8,3],[10,3],[0,4],[2,4],[5,4],[7,4],[9,4],[12,4],[14,4],[1,5],[4,5],[10,5],[13,5],[3,6],[6,6],[7,6],[8,6],[11,6],[0,7],[1,7],[2,7],[5,7],[7,7],[9,7],[12,7],[13,7],[14,7],[3,8],[6,8],[7,8],[8,8],[11,8],[1,9],[4,9],[10,9],[13,9],[0,10],[2,10],[5,10],[7,10],[9,10],[12,10],[14,10],[4,11],[6,11],[7,11],[8,11],[10,11],[3,12],[11,12],[0,13],[2,13],[4,13],[7,13],[10,13],[12,13],[14,13],[3,14],[4,14],[6,14],[7,14],[8,14],[10,14],[11,14]]},
  {gridSize: 15, design: [[1,0],[3,0],[5,0],[7,0],[9,0],[11,0],[13,0],[0,1],[1,1],[3,1],[5,1],[6,1],[8,1],[9,1],[11,1],[13,1],[14,1],[7,2],[0,3],[1,3],[3,3],[6,3],[7,3],[8,3],[11,3],[13,3],[14,3],[4,4],[10,4],[0,5],[1,5],[6,5],[8,5],[13,5],[14,5],[1,6],[3,6],[5,6],[9,6],[11,6],[13,6],[0,7],[2,7],[3,7],[7,7],[11,7],[12,7],[14,7],[1,8],[3,8],[5,8],[9,8],[11,8],[13,8],[0,9],[1,9],[6,9],[8,9],[13,9],[14,9],[4,10],[10,10],[0,11],[1,11],[3,11],[6,11],[7,11],[8,11],[11,11],[13,11],[14,11],[7,12],[0,13],[1,13],[3,13],[5,13],[6,13],[8,13],[9,13],[11,13],[13,13],[14,13],[1,14],[3,14],[5,14],[7,14],[9,14],[11,14],[13,14]]},
  //pixel art levels
  {gridSize: 16, design: [[5,0],[6,0],[7,0],[8,0],[9,0],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],[10,1],[11,1],[12,1],[4,2],[5,2],[6,2],[9,2],[11,2],[3,3],[5,3],[9,3],[12,3],[3,4],[5,4],[6,4],[10,4],[13,4],[3,5],[4,5],[9,5],[10,5],[11,5],[12,5],[5,6],[11,6],[4,7],[6,7],[7,7],[8,7],[9,7],[10,7],[12,7],[3,8],[6,8],[9,8],[13,8],[2,9],[3,9],[6,9],[7,9],[8,9],[9,9],[12,9],[13,9],[14,9],[1,10],[4,10],[5,10],[7,10],[8,10],[10,10],[11,10],[14,10],[1,11],[5,11],[6,11],[7,11],[8,11],[9,11],[10,11],[14,11],[1,12],[4,12],[5,12],[6,12],[7,12],[8,12],[9,12],[10,12],[11,12],[14,12],[2,13],[4,13],[5,13],[6,13],[9,13],[10,13],[11,13],[13,13],[3,14],[4,14],[5,14],[10,14],[11,14],[12,14],[2,15],[3,15],[4,15],[5,15],[10,15],[11,15],[12,15],[13,15]]}, //mario
  {gridSize: 16, design: [[5,0],[6,0],[7,0],[8,0],[9,0],[10,0],[4,1],[11,1],[3,2],[4,2],[6,2],[7,2],[12,2],[13,2],[2,3],[4,3],[5,3],[12,3],[14,3],[2,4],[4,4],[6,4],[7,4],[8,4],[9,4],[10,4],[12,4],[14,4],[2,5],[4,5],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5],[11,5],[12,5],[14,5],[2,6],[5,6],[6,6],[7,6],[8,6],[9,6],[10,6],[11,6],[14,6],[3,7],[6,7],[10,7],[13,7],[3,8],[6,8],[10,8],[13,8],[2,9],[4,9],[12,9],[14,9],[1,10],[4,10],[5,10],[6,10],[7,10],[8,10],[9,10],[10,10],[11,10],[12,10],[14,10],[1,11],[3,11],[4,11],[10,11],[14,11],[2,12],[3,12],[10,12],[13,12],[3,13],[4,13],[5,13],[6,13],[11,13],[12,13],[2,14],[3,14],[7,14],[8,14],[9,14],[10,14],[11,14],[12,14],[13,14],[3,15],[4,15],[5,15],[6,15],[7,15],[8,15],[9,15],[10,15],[11,15],[12,15]]}, //link
  {gridSize: 16, design: [[6,0],[7,0],[8,0],[9,0],[10,0],[4,1],[5,1],[11,1],[12,1],[3,2],[13,2],[2,3],[13,3],[2,4],[14,4],[1,5],[9,5],[11,5],[14,5],[0,6],[9,6],[11,6],[15,6],[0,7],[9,7],[11,7],[15,7],[0,8],[15,8],[0,9],[4,9],[13,9],[15,9],[1,10],[4,10],[10,10],[13,10],[15,10],[2,11],[3,11],[4,11],[13,11],[14,11],[3,12],[4,12],[5,12],[12,12],[13,12],[2,13],[6,13],[7,13],[8,13],[9,13],[10,13],[11,13],[14,13],[1,14],[7,14],[8,14],[9,14],[10,14],[15,14],[2,15],[3,15],[4,15],[5,15],[6,15],[10,15],[11,15],[12,15],[13,15],[14,15]]}, //kirby
  {gridSize: 39, design: [[17,0],[18,0],[19,0],[20,0],[21,0],[16,1],[19,1],[22,1],[15,2],[18,2],[20,2],[23,2],[15,3],[17,3],[21,3],[23,3],[14,4],[17,4],[18,4],[20,4],[21,4],[24,4],[11,5],[12,5],[13,5],[14,5],[17,5],[18,5],[19,5],[20,5],[21,5],[24,5],[25,5],[26,5],[27,5],[10,6],[15,6],[16,6],[18,6],[19,6],[20,6],[22,6],[23,6],[28,6],[9,7],[16,7],[17,7],[18,7],[20,7],[21,7],[22,7],[29,7],[10,8],[11,8],[12,8],[15,8],[18,8],[19,8],[20,8],[23,8],[26,8],[27,8],[28,8],[10,9],[12,9],[13,9],[15,9],[23,9],[25,9],[26,9],[28,9],[9,10],[13,10],[14,10],[20,10],[24,10],[25,10],[29,10],[10,11],[11,11],[12,11],[13,11],[14,11],[15,11],[20,11],[21,11],[23,11],[24,11],[25,11],[26,11],[27,11],[28,11],[10,12],[14,12],[16,12],[19,12],[22,12],[24,12],[28,12],[9,13],[13,13],[14,13],[17,13],[18,13],[20,13],[21,13],[24,13],[25,13],[29,13],[9,14],[13,14],[15,14],[17,14],[21,14],[23,14],[25,14],[29,14],[9,15],[10,15],[13,15],[15,15],[16,15],[18,15],[19,15],[20,15],[22,15],[23,15],[26,15],[27,15],[29,15],[8,16],[10,16],[11,16],[12,16],[15,16],[18,16],[20,16],[23,16],[26,16],[30,16],[7,17],[11,17],[13,17],[15,17],[16,17],[18,17],[20,17],[22,17],[23,17],[26,17],[30,17],[7,18],[10,18],[13,18],[15,18],[17,18],[19,18],[21,18],[23,18],[27,18],[29,18],[8,19],[10,19],[12,19],[14,19],[17,19],[18,19],[20,19],[21,19],[24,19],[26,19],[30,19],[8,20],[10,20],[12,20],[14,20],[16,20],[18,20],[19,20],[20,20],[22,20],[24,20],[25,20],[30,20],[8,21],[9,21],[10,21],[11,21],[12,21],[14,21],[16,21],[18,21],[20,21],[22,21],[24,21],[25,21],[27,21],[30,21],[8,22],[12,22],[14,22],[15,22],[18,22],[20,22],[23,22],[24,22],[26,22],[29,22],[8,23],[9,23],[10,23],[11,23],[12,23],[14,23],[18,23],[20,23],[24,23],[27,23],[28,23],[8,24],[12,24],[14,24],[17,24],[21,24],[24,24],[9,25],[10,25],[11,25],[15,25],[17,25],[21,25],[23,25],[14,26],[16,26],[22,26],[24,26],[14,27],[17,27],[21,27],[24,27],[13,28],[17,28],[21,28],[25,28],[13,29],[15,29],[17,29],[21,29],[23,29],[25,29],[13,30],[14,30],[16,30],[17,30],[21,30],[22,30],[24,30],[25,30],[13,31],[17,31],[21,31],[25,31],[13,32],[16,32],[22,32],[25,32],[13,33],[16,33],[22,33],[25,33],[13,34],[14,34],[15,34],[16,34],[22,34],[23,34],[24,34],[25,34],[12,35],[14,35],[16,35],[22,35],[24,35],[26,35],[11,36],[16,36],[22,36],[27,36],[10,37],[16,37],[22,37],[28,37],[10,38],[11,38],[12,38],[13,38],[14,38],[15,38],[16,38],[22,38],[23,38],[24,38],[25,38],[26,38],[27,38],[28,38]]}, //metroid
  {gridSize: 16, design: [[5,0],[6,0],[7,0],[8,0],[9,0],[10,0],[4,1],[11,1],[3,2],[12,2],[3,3],[12,3],[2,4],[3,4],[4,4],[6,4],[7,4],[8,4],[9,4],[11,4],[12,4],[13,4],[2,5],[3,5],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5],[12,5],[13,5],[1,6],[3,6],[12,6],[14,6],[1,7],[6,7],[9,7],[14,7],[2,8],[3,8],[6,8],[9,8],[12,8],[13,8],[2,9],[3,9],[4,9],[11,9],[12,9],[13,9],[1,10],[4,10],[5,10],[6,10],[7,10],[8,10],[9,10],[10,10],[11,10],[14,10],[1,11],[4,11],[5,11],[6,11],[7,11],[8,11],[9,11],[10,11],[11,11],[14,11],[2,12],[3,12],[7,12],[8,12],[12,12],[13,12],[3,13],[5,13],[6,13],[9,13],[10,13],[12,13],[3,14],[7,14],[8,14],[12,14],[4,15],[5,15],[6,15],[9,15],[10,15],[11,15]]}, //red
  {gridSize: 22, design: [[16,4],[17,4],[18,4],[19,4],[13,5],[14,5],[15,5],[16,5],[17,5],[18,5],[19,5],[2,6],[3,6],[4,6],[5,6],[6,6],[12,6],[13,6],[16,6],[17,6],[18,6],[19,6],[1,7],[2,7],[4,7],[6,7],[7,7],[13,7],[14,7],[15,7],[16,7],[17,7],[18,7],[19,7],[20,7],[1,8],[6,8],[7,8],[8,8],[9,8],[13,8],[16,8],[17,8],[18,8],[19,8],[20,8],[0,9],[1,9],[2,9],[3,9],[4,9],[5,9],[6,9],[7,9],[8,9],[9,9],[13,9],[14,9],[15,9],[16,9],[17,9],[18,9],[19,9],[20,9],[0,10],[1,10],[2,10],[3,10],[4,10],[5,10],[6,10],[7,10],[8,10],[9,10],[12,10],[14,10],[17,10],[18,10],[19,10],[20,10],[1,11],[6,11],[7,11],[8,11],[11,11],[12,11],[14,11],[15,11],[16,11],[17,11],[18,11],[19,11],[20,11],[21,11],[7,12],[11,12],[14,12],[17,12],[18,12],[19,12],[20,12],[3,13],[4,13],[5,13],[6,13],[7,13],[10,13],[11,13],[12,13],[14,13],[15,13],[16,13],[17,13],[18,13],[5,14],[6,14],[7,14],[9,14],[10,14],[11,14],[6,15],[7,15],[8,15],[14,15],[15,15],[17,15],[7,16],[12,16],[13,16],[14,16],[15,16],[16,16],[5,17],[6,17],[7,17],[8,17],[9,17],[10,17],[11,17],[4,18],[5,18],[11,18],[12,18],[13,18],[14,18],[17,18],[18,18],[5,19],[6,19],[7,19],[13,19],[14,19],[15,19],[16,19],[17,19],[18,19],[3,20],[4,20],[5,20],[6,20],[7,20],[15,20],[16,20],[17,20],[3,21],[4,21],[5,21],[6,21],[16,21]]},
  // {gridSize: 16, design: []},
  // {gridSize: 16, design: []},
  // {gridSize: 16, design: []},
  // {gridSize: 16, design: []},
  // {gridSize: 16, design: []},
  // {gridSize: 16, design: []},
  // {gridSize: 16, design: []},
  // {gridSize: 16, design: []},
  // {gridSize: 16, design: []},
  // {gridSize: 16, design: []},
  // {gridSize: 16, design: []},
  // {gridSize: 16, design: []},
  // {gridSize: 16, design: []},
  // {gridSize: 16, design: []},
  // {gridSize: 16, design: []},
  // {gridSize: 16, design: []},
  // {gridSize: 16, design: []},
  // {gridSize: 16, design: []},
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
  level !== undefined ? boardSize = gameLevels[level].gridSize
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
  playSound("switch");
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

function playSound(sound){
  const soundSwitch = document.querySelector("#switchSound");
  const soundFanfare = document.querySelector("#fanfareSound");
  if(sound == "switch"){
    soundSwitch.currentTime = 0;
    soundSwitch.play();
  } else if(sound == "fanfare"){
    soundFanfare.currentTime = 0;
    soundFanfare.play();
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
      const btnCurrentLevel = document.querySelector(`.n${level}`);
      btnCurrentLevel.classList.add("darkened");
      console.log(btnCurrentLevel);
      gameOver = true;
      toggleMenu("main","win");
      playSound("fanfare");
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
    gameLevels[l].design.forEach(t => {
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
  const normalModeLevels = document.querySelector(".normalLevelsList");
  const pixelArtModeLevels = document.querySelector(".pixelArtLevelsList");
  
  for(let i = 0; i < gameLevels.length; i++){
    const button = document.createElement("button");
    button.className = `normalLevel n${i+1}`;
    button.innerText = `Level ${i+1}`;

    button.addEventListener("click", () => {
      newGame("levels", i);
      toggleMenu("main","board");
    });
    if(i < 24){
      normalModeLevels.appendChild(button);
    } else {
      pixelArtModeLevels.appendChild(button);
    };
  };
};

//tools for "game dev"

function devLightsToArray(){
  let activeLights = [];
  tiles.forEach(t => {
    if(t.classList.contains("active")){
      activeLights.push([parseInt(t.getAttribute("x")),parseInt(t.getAttribute("y"))]);
    };
  });
  console.log("["+activeLights.join("],[")+"]");
};

function devSingleLight(){
  tiles.forEach(t => t.addEventListener("click", () => {
    toggleLights(t.getAttribute("x"),t.getAttribute("y"));
    displayMoves();
    checkWinCondition();
  }));
  tiles.forEach( t =>
  t.addEventListener("click", () => {
    let tileCenter = document.querySelector(`[x="${t.getAttribute("x")}"][y="${t.getAttribute("y")}"]`);
    tileCenter.classList.toggle("active");
  }));
};
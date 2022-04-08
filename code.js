const board = document.querySelector(".board");
let boardSize = 10;

drawBoard()

//adding actions to each tile
const tiles = document.querySelectorAll(".tile");
tiles.forEach(tile => {
  tile.addEventListener("click", () => {
    let clicked = `${tile.id}`;

    console.log(clicked)
    tile.classList.toggle("active");
  });
});


function drawBoard(){
  for(let i = 0; i < boardSize; i++){
    const row = document.createElement("div");
    row.className = `row ${i}`;
    board.appendChild(row);
    for(let j = 0; j < boardSize; j++){
      const tile = document.createElement("div");
      tile.className = `tile`;
      tile.id = `x${j}y${i}`;
      row.appendChild(tile);
    }
  }
}
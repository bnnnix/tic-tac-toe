// some vars
let game = [];
let players = ["O", "X"];
let playing = players[0];

const howToWin = [
  // horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonal - left to right
  [0, 4, 8],
  // diagonal - right to left
  [2, 4, 6],
];

// results div
const results = document.querySelector(".results");

// array of all nine cells
const cells = Array.from(document.getElementsByClassName("cell"));

// adding eventlistener (click) to every cell
cells.forEach((element) => {
  element.addEventListener("click", (e) =>
    pick(e.target.getAttribute("cell-index"), e.target)
  );
});

// New game function
function newGame(startingPlayer) {
  game = ["", "", "", "", "", "", "", "", ""];
  playing = startingPlayer;
  cells.forEach((element) => (element.innerHTML = ""));
}

// what to do when player pick some cell
function pick(cellIndex, cell) {
  if (game[cellIndex - 1] === "") {
    cell.innerHTML = playing;
    game[cellIndex - 1] = playing;
    check(playing);
  }
}

// check if someone win/lose or if its draw
function check(player) {
  let win = "";
  howToWin.forEach((element) => {
    if (
      game[element[0]] === game[element[1]] &&
      game[element[0]] === game[element[2]] &&
      game[element[1]] === game[element[2]] &&
      game[element[0]] === player
    ) {
      win = "win";
    } else if (!game.includes("")) {
      win = "draw";
    }
  });

  if (win === "win") end(player, "win");
  else if (win === "draw") end(player, "draw");
  else {
    playing = playing == players[0] ? players[1] : players[0];
  }
}

// end of the game
function end(player, result) {
  results.innerHTML = result === "draw" ? `DRAW` : `${player} WIN`;
  results.style.display = "block";
  results.addEventListener("click", () => {
    results.style.display = "none";
    newGame(player === players[0] ? players[1] : players[0]);
  });
}

// first new game
newGame(playing);

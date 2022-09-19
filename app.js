//

let gameActive = true;
let gameWon = false;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  let arra = [];
  for (let i = 0; i < state.board.length; i++) {
    let row = state.board[i];
    for (let j = 0; j < row.length; j++) {
      arra.push(state.board[i][j]);
    }
  }
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = arra[winCondition[0]];
    let b = arra[winCondition[1]];
    let c = arra[winCondition[2]];
    if (a === null || b === null || c === null) {
      continue;
    }
    if (a === b && b === c) {
      gameWon = true;
      gameActive = false;
      if (state.players[state.currentPlayerIDX - 1] !== undefined) {
        resultElemn.innerText = ` ${
          state.players[state.currentPlayerIDX - 1]
        } wins!`;
        break;
      } else {
        resultElemn.innerText = ` ${state.players[1]} wins!`;
        break;
      }
    }
  }
}

// state

//create initial state
const state = {};

// build initial state which is going to populate our board
function buildInitialState() {
  (state.currentPlayerIDX = 0),
    (state.players = ["", ""]),
    (state.board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
  state.getCurrentPlayer = function () {
    return state.players[state.currentPlayerIDX];
  };
}

//DOM SELECTORS
const boardElem = document.querySelector("#board");
const playerTurnElem = document.querySelector("#player-turn");
const resultElemn = document.getElementById("result");
const restartElem = document.getElementById("restart");
// const onePlayerElem = document.getElementById("oneplayer");

// Game Logic
function changePlayer() {
  if (state.currentPlayerIDX === 0) {
    state.currentPlayerIDX = 1;
  } else {
    state.currentPlayerIDX = 0;
  }
}

function renderBoard() {
  boardElem.innerHTML = "";
  for (let i = 0; i < state.board.length; i++) {
    let row = state.board[i];
    for (let j = 0; j < row.length; j++) {
      //card for each board
      const card = state.board[i][j];
      // create div tag for each cell
      const cellElem = document.createElement("div");
      //create class for each cell
      cellElem.classList.add("cell");
      cellElem.dataset.index = `${i}, ${j}`;

      cellElem.innerText = card;

      // add the cellElem to the board
      boardElem.appendChild(cellElem);
    }
  }
}

function renderPlayer() {
  let text;
  if (!state.players[0] || !state.players[1]) {
    text = `
        <input name="player1" placeholder="Enter Player 1">
        <input name="player2" placeholder="Enter Player 2">
        <button class="start"> Start Game </button>
        `;
  } else {
    text = `It's currently <span class="player">${state.getCurrentPlayer()}</span>'s turn`;
  }
  playerTurnElem.innerHTML = text;
}

function gameOver() {
  if (
    !state.board[0].includes(null) &&
    !state.board[1].includes(null) &&
    !state.board[2].includes(null)
  ) {
    resultElemn.innerText = `It's a tie! Game Over!`;
    gameActive = false;
  }
}

function render() {
  renderBoard();
  renderPlayer();
  gameOver();
  checkWinner();
}
// event listeners
boardElem.addEventListener("click", function (event) {
  if (gameActive === false) {
    return;
  } else if (event.target.innerText === "X" || event.target.innerText === "O") {
    return;
  } else {
    if (
      event.target.className === "cell" &&
      state.currentPlayerIDX === 0 &&
      state.players[0]
    ) {
      const [row, column] = event.target.dataset.index.split(",");
      state.board[Number(row)][Number(column)] = "X";
      changePlayer();
      render();
    } else if (state.players[0]) {
      const [row, column] = event.target.dataset.index.split(",");
      state.board[Number(row)][Number(column)] = "O";
      changePlayer();
      render();
    }
  }
});

playerTurnElem.addEventListener("click", function (event) {
  if (event.target.className !== "start") {
    return;
  }
  const player1Input = document.querySelector("input[name=player1]");
  const player2Input = document.querySelector("input[name=player2]");
  state.players[0] = player1Input.value;
  state.players[1] = player2Input.value;
  render();
});

restartElem.addEventListener("click", function () {
  gameActive = true;
  gameWon = false;
  buildInitialState();
  render();
  resultElemn.innerText = "";
});

/* onePlayerElem.addEventListener("click", function () {
  console.log("one player selected");
});
*/

// bootstrapping
buildInitialState();
render();

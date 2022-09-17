//

let gameActive = true;

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







// state


//create initial state
const state = {} 

// build initial state which is going to populate our board
function buildInitialState(){
    state.currentPlayerIDX = 0,
    state.players = ["", ""],
    state.board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]
    state.getCurrentPlayer = function () {
        return state.players[state.currentPlayerIDX];
    }
   
}









//DOM SELECTORS
const boardElem = document.querySelector("#board")
const playerTurnElem = document.querySelector("#player-turn");


// Game Logic
function changePlayer(){
    if (state.currentPlayerIDX === 0){
        state.currentPlayerIDX = 1;
    } else {
        state.currentPlayerIDX = 0;
    }
}




function renderBoard(){ 
    boardElem.innerHTML =""; 
for (let i = 0; i < state.board.length; i++){
    let row = state.board[i]
    for (let j = 0; j < row.length; j++){
    //card for each board
    const card = state.board[i][j] 
    // create div tag for each cell
    const cellElem = document.createElement("div");
    //create class for each cell
    cellElem.classList.add("cell");
    cellElem.dataset.index = `${i}, ${j}`
    
    cellElem.innerText = card

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
        `
    } else {
        text = `It's currently <span class="player">${state.getCurrentPlayer()}</span>'s turn`;
    }
    playerTurnElem.innerHTML = text;
}

function gameOver() {
    if (!state.board[0].includes(null) && !state.board[1].includes(null) && !state.board[2].includes(null)){
        console.log('The GAME IS OVER');

    }



}


function render() {
    renderBoard();
    renderPlayer();
    gameOver();
   

}
// event listeners
boardElem.addEventListener("click", function(event){
    console.log("click",event.target.innerText);
    if (event.target.innerText === 'X' || event.target.innerText === 'O'){
        return;
    } else {
    if (event.target.className === 'cell' && state.currentPlayerIDX === 0 && state.players[0]){
        const [row,column] = event.target.dataset.index.split(',');
        state.board[Number(row)][Number(column)] = 'X';
        changePlayer()
        console.log("Current Player" , state.players[state.currentPlayerIDX])
        render()
    } else if (state.players[0]) { 
        const [row,column] = event.target.dataset.index.split(',');
        state.board[Number(row)][Number(column)] = 'O';
        changePlayer()
        console.log("Current Player" , state.players[state.currentPlayerIDX])
        render()

    }
    }
} );

playerTurnElem.addEventListener("click", function(event){
    console.log("click");
    if (event.target.className !== "start"){
        return;
    }
    const player1Input = document.querySelector("input[name=player1]");
    const player2Input = document.querySelector("input[name=player2]");
    console.log("player1Input", player1Input.value);
    console.log("player2Input", player2Input.value);
    state.players[0] = player1Input.value;
    state.players[1] = player2Input.value;
    render()
})





// bootstrapping
buildInitialState();
render()






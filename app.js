//

let currentPlayer = 'X';




// state


//create initial state
const state = {} 

// build initial state which is going to populate our board
function buildInitialState(){
    state.currentPlayerIDX = 0,
    state.players = ['x', 'o'],
    state.board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]
}

function changePlayer(){
    if (state.currentPlayerIDX === 0){
        state.currentPlayerIDX = 1;
    } else {
        state.currentPlayerIDX = 0;
    }
}




//DOM SELECTORS
const boardElem = document.querySelector("#board")
console.log(boardElem);
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
// event listeners
boardElem.addEventListener("click", function(event){
    console.log("click");
    console.log("this", this);
    if (event.target.className === 'cell'){
        const [row,column] = event.target.dataset.index.split(',');
        console.log(row,column, 'a')
        state.board[Number(row)][Number(column)] = state.players[state.currentPlayerIDX];
        changePlayer()
        renderBoard()
    
    }



} );



// bootstrapping
buildInitialState();
renderBoard();






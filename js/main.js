console.log("hello, world!");
	/*----- constants -----*/
const COLORS = {
    '0' : 'white',
    '1' : 'pink',
    '-1': 'purple'
};


	/*----- state variables -----*/

// The board: 7 col; 6 rows --> two-dim array
let board; //array of 7 column arrays
    // initialize with 0 -> no plays
    // array elems update with 1/-1 to represent the player's move
// The current player/turn (1 or -1)
let turn;
// Winner: null while in play; then 1/-1; for tie: "T"
let winner;


	/*----- cached elements  -----*/
const messageEl = document.querySelector('h1');
const playAgainBtn = document.querySelector('button');
const markerEls = document.querySelectorAll('#markers > div');

	/*----- event listeners -----*/


	/*----- functions -----*/

    // Initialize all state, then call render() - doesn't need input
    function init(){
        //initializing the let board var; rotate 90 deg counterclockwise to visualize the board in the DOM
        board = [
            [1, -1, 0, 0, 1, 0, 0], // col 0
            [0, 0, 0, 0, 0, 0, 0], // col 1
            [0, 0, 0, 0, 0, 0, 1], // col 2
            [0, 0, 0, 0, 0, 0, 0], // col 3
            [0, 0, 0, 0, 0, 0, 1], // col 4
            [0, 0, 0, 0, 0, 0, 0] // col 5
        ]; 
        //game begins with Player 1
        turn = 1;
        winner = null;
        render();
    }
    // Substantial function, so broken out into multiple subfunctions
    // Purpose is to visualize the state of the board in the DOM
    function render() {
        renderBoard();
        renderMessage();
        // Hide/show UI elements (controls)
        renderControls();
    }

    function renderBoard(){
        //Iterate through the board's array to determine what displays on the board
        board.forEach(function(colArr, colIdx) {
            // Iterate over the cells in the cur column (colArr)
            console.log("reading board")
            colArr.forEach(function(cellVal, rowIdx) {
                //Access the value in the col and row
                const cellId = `c${colIdx}r${rowIdx}`;
                const cellEl = document.getElementById(cellId);
                console.log(cellId)
                // SOMETHING'S WRONG -- JS ERROR IN CHROME
                //cellEl.style.backgroundColor = COLORS[cellVal];
            });
        });
    }

    function renderMessage(){
        
        if (winner === 'T') {
            messageEl.innerText = "It's a tie!!!"
        }
        // Declare winner
        else if (winner) {
            messageEl.innerHTML = `<span style="color: ${COLORS[turn]}">${COLORS[turn].toUpperCase()}</span> won!`;
        }
        // Someone's turn
        else {
            messageEl.innerHTML = `It's <span style="color: ${COLORS[turn]}">${COLORS[turn].toUpperCase()}</span>'s Turn`;

        }
    }

    function renderControls(){
        // Ternary expression is the go to when you want 1 of 2 values returned
        // <cond exp> ? <truthy><falsy>
        // visible and hidden are CSS values for visibility
        playAgainBtn.style.visibility = winner ? 'visible' : 'hidden';
        //Iterate over the marker elems to hide triangles for full cols
        markerEls.forEach(function(markerEl, colIdx){
            //If , the col is full or if there's a winner
            const hideMarker = !board[colIdx].includes(0) || winner;
            markerEl.style.visibility = hideMarker ? 'hidden' : 'visible'
        });
    }



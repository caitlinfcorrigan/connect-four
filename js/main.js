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
//Make an array with all of the triangles
const markerEls = [...document.querySelectorAll('#markers > div')];

	/*----- event listeners -----*/
document.getElementById('markers').addEventListener('click', handleDrop);
// Start over by calling init when clicked; DO NOT INVOKE
playAgainBtn.addEventListener('click', init);


	/*----- functions -----*/

    // Initialize all state, then call render() - doesn't need input
    function init(){
        //initializing the let board var; rotate 90 deg counterclockwise to visualize the board in the DOM
        board = [
            [0, 0, 0, 0, 0, 0], // col 0
            [0, 0, 0, 0, 0, 0], // col 1
            [0, 0, 0, 0, 0, 0], // col 2
            [0, 0, 0, 0, 0, 0], // col 3
            [0, 0, 0, 0, 0, 0], // col 4
            [0, 0, 0, 0, 0, 0], // col 5
            [0, 0, 0, 0, 0, 0], // col 6
        ]; 
        //game begins with Player 1
        turn = 1;
        winner = null;
        render();
    }

    // Check for the winner in board state and return null if no winner
    // Return 1/-1 if a player won, or T if tie
    // RETURNING THE WRONG COLOR WINNER
    function getWinner(colIdx, rowIdx) {
        // Pass in the last play and where to begin counting to checkVW
        return checkVerticalWin(colIdx, rowIdx) ||
        checkHorizontalWin(colIdx, rowIdx) ||
        checkDiagonalWinNESW(colIdx, rowIdx) ||
        checkDiagonalWinNWSE(colIdx, rowIdx);
    }

    function checkDiagonalWinNESW (colIdx,rowIdx){
        let adjCountNE = countAdjacent(colIdx, rowIdx, 1, 1);
        let adjCountSW = countAdjacent(colIdx, rowIdx, -1, -1);
        return (adjCountNE + adjCountSW) >= 3 ? board[colIdx][rowIdx] : null;
    }

    function checkDiagonalWinNWSE (colIdx,rowIdx){
        let adjCountNW = countAdjacent(colIdx, rowIdx, 1, -1);
        let adjCountSE = countAdjacent(colIdx, rowIdx, -1, 1);
        return (adjCountNW + adjCountSE) >= 3 ? board[colIdx][rowIdx] : null;
    }

    // Check for horizontal win
    function checkHorizontalWin (colIdx, rowIdx) {
        let adjCountLeft = countAdjacent(colIdx, rowIdx, -1, 0);
        let adjCountRight = countAdjacent(colIdx, rowIdx, 1, 0);
        return (adjCountLeft + adjCountRight) >= 3 ? board[colIdx][rowIdx] : null;
    }

    // Check for vertical win (count the # of same elem in the col below last play)
    function checkVerticalWin(colIdx, rowIdx){
        return countAdjacent(colIdx, rowIdx, 0, -1) === 3 ? board[colIdx][rowIdx] : null;
    }

    function countAdjacent(colIdx, rowIdx, colOffset, rowOffset) {
        // Shortcut var to play val's
        const player = board[colIdx][rowIdx]
        // Track count of adjacent cells with the same player val
        let count = 0;
        // Initialize colIdx and rowIdx locally with new values
        colIdx += colOffset;
        rowIdx += rowOffset;
        // Create while loop to count
        while (
            // Ensure coldIdx is within bounds of the board array
            board[colIdx] !== undefined &&
            // Ensure rowIdx is within bounds of the board array
            board[rowIdx] !== undefined &&
            // cannot use board[colIdx][rowIdx] to check bc it returns error, not undefined if not existant
            board[colIdx][rowIdx] === player
        ) {
            // If it meets all conditions, increment count
            count++;
            colIdx += colOffset;
            rowIdx += rowOffset;
        }
        return count;
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
            colArr.forEach(function(cellVal, rowIdx) {
                //Access the value in the col and row
                const cellId = `c${colIdx}r${rowIdx}`;
                const cellEl = document.getElementById(cellId);
                cellEl.style.backgroundColor = COLORS[cellVal];
            });
        });
    }

    function renderMessage(){
        if (winner === 'T') {
            messageEl.innerText = "It's a tie!!!"
        }
        // Declare winner
        else if (winner) {
            messageEl.innerHTML = `<span style="color: ${COLORS[winner]}">${COLORS[winner].toUpperCase()}</span> won!`;
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
            markerEl.style.visibility = hideMarker ? 'hidden' : 'visible';
        });
    }

    //In response to user interaction, update all impacted state then call render()
    function handleDrop(evt){
        const colIdx = markerEls.indexOf(evt.target);
        // Guards...
        if (colIdx === -1) return;
        // Get the colum index clicked
        const colArr = board[colIdx];
        // Find the first index of the first 0 in colArr
        const rowIdx = colArr.indexOf(0)
        // Update the board state with the cur player value (turn)
        colArr[rowIdx] = turn;
        // Switch player turns (multiply by -1 to flip)
        console.log(colIdx, rowIdx)
        console.log(board[colIdx][rowIdx])
        turn *= -1;
        winner = getWinner(colIdx, rowIdx);
        render();
    };


init();
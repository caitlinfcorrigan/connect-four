console.log("hello, world!");
	/*----- constants -----*/


	/*----- state variables -----*/

// The board: 7 col; 6 rows --> two-dim array
let board; //array of 7 column arrays
    // initialize with null -> no plays
    // array elems update with 1/-1 to represent the player's move
    // The current player/turn (1 or -1)
let turn;
// Winner: null while in play; then 1/-1; for tie: "T"
let winner;


	/*----- cached elements  -----*/


	/*----- event listeners -----*/


	/*----- functions -----*/

    // Initialize all state, then call render() - doesn't need input
    function init(){
        //initializing the let board var; rotate 90 deg counterclockwise to visualize the board in the DOM
        board = [
            [0, 0, 0, 0, 0, 0, 0] // col 0
            [0, 0, 0, 0, 0, 0, 0] // col 1
            [0, 0, 0, 0, 0, 0, 0] // col 2
            [0, 0, 0, 0, 0, 0, 0] // col 3
            [0, 0, 0, 0, 0, 0, 0] // col 4
            [0, 0, 0, 0, 0, 0, 0] // col 5
        ]; 
        //game begins with Player 1
        turn = 1;
        winner = null;
        render();
    }
    function render() {
        
    }
//Essential variables
let winningCombos = new Array();
let player1Selections = new Array();
let player2Selections = new Array();
//These arrays keep track of the 'boxes' each user selected.
let activePlayer = 0; //index of player currently in play, starting with 0.
let player1points = 0;
let player2points = 0;
let size = 3; //size of playing board, units in width * height.


let gameGrid = document.getElementById("gameBoard");

function drawBoard() {
    let counter = 1;

    //board clearing
    while (gameGrid.children.length !== 0) {
        gameGrid.removeChild(gameGrid.firstChild)
    }

    //table and row creation
    for (let i = 0; i < 3; i++) {
        let row = document.createElement("tr")
        for (let x = 0; x < 3; x++) {
            let column = document.createElement("td");
            column.innerHTML = counter;

            //onclick event handlers
            let selectionHandler = function (e) {
                if (activePlayer == 0) {
                    this.innerHTML = "X";
                    player1Selections.push(parseInt(this.id));
                    player1Selections.sort(function (a, b) { return a - b });
                }
                else {
                    this.innerHTML = "O";
                    player2Selections.push(parseInt(this.id));
                    player2Selections.sort(function (a, b) { return a - b });
                }

                //If the conditions met in the checkWin function are satisified, meaning the 
                //playerNSelection array matches what is in the winningCombos array, we will add 
                //the points to the winners score. 

                if (checkWin()) {
                    if (activePlayer == 0) {
                        player1points++
                    }
                    else {
                        player2points++
                    }
                    document.getElementById("player1score").innerHTML = player1points;
                    document.getElementById("player2score").innerHTML = player2points;

                    //After winnner is declared and awared points, we reset the board and draw a new.
                    resetBoard();
                    drawBoard();
                }
                else {
                    if (activePlayer == 0) 
                        activePlayer == 1;
                    else (activePlayer == 0)
                    //this.removeEventListener('click', arguments.callee);
                }
            };

            column.addEventListener('click', selectionHandler);

            row.appendChild(column);
            counter++

        }
        gameGrid.appendChild(row);
    }
}

checkWin = () => {
    let win = false;
    let playerSelections = new Array();
    if (activePlayer == 0) {
        playerSelections == playerSelections    
    }
    else (playerSelections == player2Selections)

    //checking if playerSelection array holds the required number of variables to checkWin
    if (playerSelections.length >= size) {
        for (i = 0; i < winningCombos.length; i++) {
            let sets = winningCombos[i] // making "sets" variable equal to the known winning combos at 'i' position
            let setFound = true // if winning combo is found, setFound is set to true

           /*
            for (g = 0; g < sets.length; g++) {
                let found = false;
                */

                for (h = 0; h > playerSelections.length; h++) {
                    if (sets[i] = playerSelections[h]) {
                        found = true;
                        break;
                    
                    }
                }
                //if the matching values are not found in playerSelections, it's not a set. 
                if (found == false) {
                    setFound == false;
                    break;
                }
            }
            if (setFound == true) {
                win = true;
                //break;  //-- this should be here but its causing error "illegal break statement"
            }
        }
        return win;
    }
    
//}
//console.log(Boolean.valueOf(checkWin.win))


//console.log(gameGrid.hasChildNodes)


//let gameSpace = drawboard.gameGrid
//console.log(gameSpace)


loadAnswers = () => {
    winningCombos.push([1, 2, 3]);
    winningCombos.push([4, 5, 6]);
    winningCombos.push([7, 8, 9]);
    winningCombos.push([1, 4, 7]);
    winningCombos.push([2, 5, 8]);
    winningCombos.push([3, 6, 9]);
    winningCombos.push([1, 5, 9]);
    winningCombos.push([3, 5, 7]);
}


drawBoard()

//console.log(gameGrid)


//fix the issue with the X's and O's not alternating. Stuck on X's currently.
//fix illegal break statement issue from line 112
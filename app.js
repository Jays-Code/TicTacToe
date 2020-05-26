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
console.log("activePlayer is:" + activePlayer)
                    player1Selections.push(parseInt(this.innerHTML));
                    player1Selections.sort(function (a, b) { return a - b });
                    console.log("player 1 chooses " + this.innerHTML)
                    //player1Selections.push()
                    this.innerHTML = "X";
                    //console.log(this.innerHTML) //output is the innerHTML of box I clicked
                    //console.log(this.id) //outputs blank line, big problem
                    console.log("So far, player 1 has chosen: " + player1Selections)
                    //console.log(player1Selections)

                }
                else {

                    player2Selections.push(parseInt(this.innerHTML));
                    player2Selections.sort(function (a, b) { return a - b });
                    console.log("player 2 chooses " + this.innerHTML)
                    this.innerHTML = "O";
                    console.log("So far, player 2 has chosen: " + player2Selections)
                }
                //console.log(activePlayer)

                //If the conditions met in the checkWin function are satisified, meaning the 
                //playerNSelection array matches what is in the winningCombos array, we will add 
                //the points to the winners score. 

                if (checkWin()) { //runs checkWin function. If conditions are met, runs if statement.
                    if (activePlayer == 0) 
                        player1points++;
                    
                    else 
                        player2points++
                    
                    document.getElementById("player1score").innerHTML = player1points;
                    document.getElementById("player2score").innerHTML = player2points;
                    //console.log(player1Selections + player2Selections)

                    //After winnner is declared and awared points, we reset the board and draw a new.
                    resetBoard();
                    drawBoard();
                }
                else if (player2Selections.length + player1Selections.length == 9) {
                    console.log("game thinks player1Selections + player2Selections === 9")
                    //display some message that this is a draw
                    resetBoard();
                    drawBoard();

                }
                else { //if it runs checkWin function and winning condition not met, this is ran.
                    if (activePlayer == 0)
                        activePlayer = 1;
                    else (activePlayer = 0)
                    this.removeEventListener('click', arguments.callee);
                }
            };

            column.addEventListener('click', selectionHandler);

            row.appendChild(column);
            counter++

        }
        gameGrid.appendChild(row);
    }

    loadAnswers();
}

//let playerSelections = new Array();

checkWin = () => {
    let win = false;
    //console.log("checkWin is run")
    let playerSelections = new Array();
    if (activePlayer == 0) {
        playerSelections = player1Selections
    }
    else (playerSelections = player2Selections)

    //checking if playerSelection array holds the required number of variables to checkWin
    if (playerSelections.length >= size) {
        for (i = 0; i < winningCombos.length; i++) {
            let sets = winningCombos[i] // making "sets" variable equal to the known winning combos at 'i' position
            let setFound = true // if winning combo is found, setFound is set to true

            
            for (g = 0; g < sets.length; g++) {
                let found = false; //found refers to one card

                
                //console.log(playerSelections.length)
                //console.log(setFound)

                for (h = 0; h < playerSelections.length; h++) {
                    //console.log("for loop with H variable is run")
                    //console.log(i)
                    //console.log(sets)
                    //console.log(playerSelections[h+1])
                    console.log(sets[g])
                    console.log("id of activePlayer: " + activePlayer)
                    console.log(playerSelections[h]) // currently always showing 2nd players choices
                    if (sets[g] == playerSelections[h]) {
                        
                        //sets[i + 1] == playerSelections[h + 1] &&
                        //sets[i + 2] == playerSelections[h + 2]) {

                        found = true;
                        /*

                        console.log(setFound)

                        console.log(sets)
                        console.log(sets[g + 1])
                        console.log(playerSelections[h+1])
                        
                        */

                        //setFound = true;
                        console.log("match appears so found = true")
                        
                        //console.log(found)
                        break;
                    }
                }
                if (found == false) {
                    console.log(found)
                    setFound = false;
                    break;
                }
            }
            //if the matching values are not found in playerSelections, it's not a set. 
            

            //console.log(setFound)


            if (setFound == true) {  // was setFound == true (probably should be)
                //console.log("in the end, setFound is true")
                win = true;
                //console.log(playerSelections) - logs the selections of player after winner

                console.log(win)

                 break;  //-- this should be here but its causing error "illegal break statement"
            }
        }
    }
    //console.log(setFound)

    //console.log(player1Selections)

    return win;
    console.log(win)
}

//}
//console.log(Boolean.valueOf(checkWin.win))


//console.log(gameGrid.hasChildNodes)


//let gameSpace = drawboard.gameGrid
//console.log(gameSpace)

getPlayerElement = (idFromHtml) => {
    //we are setting whatever is returned in the elem variable equal to the html id parameter
    let elem = document.getElementById(idFromHtml)
    return elem
}



resetBoard = () => {
    activePlayer = 0;
    player1Selections = new Array()
    player2Selections = new Array()
    playerSelections = new Array()
    //Make player 1 the selected player again
    //getPlayerElement("player1score").classList.add('selected')
    //getPlayerElement("player2score").classList.remove('selected')
}


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





//highlight the selected player properly

//hide counter placeholders on board 1-9 and only reveal innerHtml when player selects

/* ------------ NEW NOTES BELOW

Currently When player 2 wins, it is recognized, board reset, score incremented properly.
However when player 1 wins, nothing happens and it is not recognized.

--refer to note line ~134 regarding playerSelections
(player 2 is stuck as activePlayer during the checkWin statement)

---- latest notes

Player 2 is working perfectly all throughout
player1Selections are not being counted properly, view console logs
--currently player1selections array is not persisting, only last selection is there
*/
 
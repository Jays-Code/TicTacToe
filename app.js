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
        //note the existing gameGrid is being removed here and new one is built.
        gameGrid.removeChild(gameGrid.firstChild)
    }

    //table and row creation
    for (let i = 0; i < 3; i++) {
        let row = document.createElement("tr")
        for (let x = 0; x < 3; x++) {
            let column = document.createElement("td");
            column.innerHTML = "♥"
            column.id = counter;

            //onclick event handlers
            let selectionHandler = function (e) {
                if (activePlayer == 0) {
                    player1Selections.push(parseInt(this.id));
                    player1Selections.sort(function (a, b) { return a - b });
                    console.log("Player 1 chooses " + column.id)
                    this.innerHTML = "X";
                    console.log("So far, player 1 has chosen: " + player1Selections)
                    getPlayerElement("player1score").classList.remove('selected')
                    getPlayerElement("player2score").classList.add('selected')




                }
                else {

                    player2Selections.push(parseInt(this.id));
                    player2Selections.sort(function (a, b) { return a - b });
                    console.log("Player 2 chooses " + column.id)
                    this.innerHTML = "O";
                    console.log("So far, player 2 has chosen: " + player2Selections)
                    getPlayerElement("player2score").classList.remove('selected')
                    getPlayerElement("player1score").classList.add('selected')
                }


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


                    //After winnner is declared and awared points, we reset the board and draw a new.
                    winnerShown();
                    //removeModal();
                    drawBoard();
                }
                else if (player2Selections.length + player1Selections.length == 9) {
                    console.log("A draw has occured. Board reset!")
                    //display some message that this is a draw
                    winnerShown();
                    //removeModal();
                    drawBoard();

                }
                else { //if it runs checkWin function and winning condition not met, this is ran.
                    if (activePlayer == 0)
                        activePlayer = 1;
                    else (activePlayer = 0)
                    //this.removeEventListener('click', arguments.callee);
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

//Logic for checking if box is already taken
/*
checkTaken = () => {
    //takes the latest playerSelection and checks if that number is in any index of 
    //either the player1Selections or player2Selections

    //if [value] exists in any index of the array{
        //reject selection
        //make setTimeout modal appear that states:
        //"The opponent has already taken this box! Where else can I go... (thinking emoji)"
    }
    //break
}

*/

checkWin = (playerSelectionsContainer) => {
    let win = false;
    let playerSelections = new Array();
    playerSelectionsContainer = playerSelections
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


                for (h = 0; h < playerSelections.length; h++) {

                
                    if (sets[g] == playerSelections[h]) {

                        found = true;
                        break;
                    }
                }
                if (found == false) {
                    setFound = false;
                    break;
                }
            }
            //if the matching values are not found in playerSelections, it's not a set. 


            if (setFound == true) {
                win = true;
                console.log("Is there a win: " + win)
                break;
            }
        }
    }


    return win;
    
}





getPlayerElement = (idFromHtml) => {
    //we are setting whatever is returned in the elem variable equal to the html id parameter
    let elem = document.getElementById(idFromHtml)
    return elem
}


winnerShown = () => {
    //show modal for player that won
    let showModal = () => {
        let getModal = document.getElementsByClassName("modal");
        getModal[0].style.display = "block"
        console.log("modal is triggered");
        if (activePlayer == 0) {
            getModal[0].innerHTML = ("Player 1 has won!");
        }
        else {
            getModal[0].innerHTML = ("Player 2 has won!");
        }
        console.log(activePlayer)
        return getModal
        /*
        theModal = getModal
        console.log(theModal)
        return theModal
        */
    }

    //removing the modal
    removeModal = () => {
        let getModal = document.getElementsByClassName("modal")
        getModal[0].style.display = "none"
        console.log("modal is removed")
    }

    resetBoard = () => {
        activePlayer = 0;
        player1Selections = new Array()
        player2Selections = new Array()
        playerSelections = new Array()
        //Make player 1 the selected player again
        getPlayerElement("player1score").classList.add('selected')
        getPlayerElement("player2score").classList.remove('selected')

    }
    showModal();
    resetBoard();
    setTimeout(function(){removeModal(); }, 5000);
    
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







//add a modal that says which player wins, then when they click "re-match", board resets.


//Use ⚡ for one of the players tokens. 
//misc unicode symbols https://jrgraphix.net/r/Unicode/2600-26FF

//css for text fade in when player clicks a box

// noises for each player when they click a box

//board shakes or flashes when a draw is reached or player wins

//Best: find some css to make the innerHtml of the boxes pulsate 
//(grow 25% and shrink once every few seconds, maybe color mutate too)

//make best of 3 5 or 7 menu show on page load;

//make the starting player switch every game (or math.random for 'coin flip')

//make the whole board expand in size with css animation upon load after welcome screen
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



let gameCount = 0;


function drawBoard() {
    if (player1points + player2points > 0 && gameCount > 0) {
        console.log("gameCount: " + gameCount)
        getModal[0].style.display = "block"
    }
    else {
        getModal[0].style.display = "none"
    }


    let counter = 1;

    //board clearing
    while (gameGrid.children.length !== 0) {
        //note the existing gameGrid is being removed here and new one is built.

        gameGrid.removeChild(gameGrid.firstChild)
        getModal[0].style.display = "block"
    }

    //table and row creation
//console.table(gameGrid)
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
                    if (activePlayer == 0) {
                        player1points++;
                        gameCount++
                    }

                    else {
                        player2points++
                        gameCount++
                    }

                    document.getElementById("player1score").innerHTML = player1points;
                    document.getElementById("player2score").innerHTML = player2points;


                    //After winnner is declared and awared points, we reset the board and draw a new.
                    showModal();
                    winnerShown();

                    //removeModal();
                    //drawBoard();
                    setTimeout(function () { drawBoard(); }, 3000);
                }
                else if (player2Selections.length + player1Selections.length == 9) {
                    console.log("A draw has occured. Board reset!")
                    gameCount++
                    //display some message that this is a draw
                    showModal();
                    winnerShown();

                    //setTimeout(function () { removeModal(); }, 8000);
                    //drawBoard();
                    setTimeout(function () { drawBoard(); }, 3000);

                }
                else { //if it runs checkWin function and winning condition not met, this is ran.
                    if (activePlayer == 0)
                        activePlayer = 1;
                    else (activePlayer = 0)
                    
                    let removeClickablility = () => {
                        this.removeEventListener('click', arguments.callee);
                    }
                  
                        removeClickablility();
                        console.log("removeClickability function is ran")
                    
                }
            };

            let addClickability = () => column.addEventListener('click', selectionHandler);
                    setTimeout(function () { addClickability(); }, 2500);
                    setTimeout(function () {console.log("squares are now clickable"); }, 2500);
                    //addClickability();

            row.appendChild(column);
            counter++

        }
        gameGrid.appendChild(row);
    }

    loadAnswers();
}




let playerSelections = new Array();


checkWin = (playerSelectionsContainer) => {
    let win = false;
    

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

let getModal = document.getElementsByClassName("modal");
getModal[0].style.display = "block"
getModal[0].classList.add["modal"]
//show modal for player that won
let showModal = () => {


    //let getModalContent = document.getElementsByClassName("modalContent")
    //console.log(getModal)
    getModal[0].classList.add["modal"]
    //getModalContent[0].classList.add("modalContent")




    getModal[0].style.display = "block"
    //console.log("modal is triggered");
    console.log("activePlayer is: " + activePlayer)

    if (activePlayer == 1) {
        getModal[0].innerHTML = ("Player 2 has won!");
        console.log(activePlayer)
    }

    if (activePlayer == 0 && !checkWin()) {

        /*
        if (player1points + player2points == 0 && gameCount > 0) {
            console.log("gameCount: " + gameCount)
            getModal[0].style.display = "block"
            */
        getModal[0].style.display = "block"
        getModal[0].innerHTML = ("A draw has occured. Board reset!")


    }
    else if
        (activePlayer == 0) {
        getModal[0].innerHTML = ("Player 1 has won!");
        //console.log(getModalContent[0].innerHTML)
        console.log(getModal[0].innerHTML)
        //console.log(activePlayer)
    }


    return getModal
    /*
    theModal = getModal
    console.log(theModal)
    return theModal
    */
}



makeClickable = () => {
        gameGrid.style.pointerEvents = "auto";
    }
makeUnclickable = () => {
    gameGrid.style.pointerEvents = "none";
}


makeUnclickable()

winnerShown = () => {


    //removing the modal
    removeModal = () => {
        //let getModal = document.getElementsByClassName("modal")
        if (player1points + player2points > 0) {
            getModal[0].style.display = "none"
            //getModal[0].classList.remove("modal")
            //console.log("modal is removed")
        }

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
    //drawBoard()
    //showModal();
    resetBoard();
    //setTimeout(function () { resetBoard(); }, 500);
    setTimeout(function () { removeModal(); }, 8000);


    //removeModal();

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


//setTimeout(() => {
    drawBoard();
//}, 3000);








/*--------------------------THE SANDBOX--------------------------- */

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

//note: resetBoard() handles the logic for the resetting players hands, but not the innerHtml.





//find out whats actually triggering board reset (innerhtml specifically) and
//put setTimeout of 2s on that function
//remove all setTimeouts if times don't sync up properly.

//https://www.youtube.com/watch?v=4UvWpjSRrm0 CSS gradient morphing animation



//make a little banner for the bottom of the page that says on the bottom right:
//"This game is brought to you by Jays-Code[tm]"
//and the bottom left has a github logo that links to your github

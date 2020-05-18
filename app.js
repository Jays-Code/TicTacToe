//Essential variables
let winningCombos = new Array();
let player1Selections = new Array();
let player2Selections = new Array();
//These arrays keep track of the 'boxes' each user selected.
let activePlayer = 0; //index of player currently in play, starting with 0.
let player1points = 0;
let player2points = 0;
let size = 3; //size of playing board, units in width * height.

function drawboard() {
    let parent = document.getElementById("gameBoard");
    let counter = 1;

    for (let i = 0; i < 3; i++) {
        let row = document.createElement("tr")
        for (let x = 0; x < 3; x++) {
            let column = document.createElement("td");
            column.innerHTML = counter;

            row.appendChild(column);
        }
        parent.appendChild(row);
    }
}

loadanswers = () => {
    winningCombos.push([1,2,3]);
    winningCombos.push([4, 5, 6]);
    winningCombos.push([7, 8, 9]);
    winningCombos.push([1, 4, 7]);
    winningCombos.push([2, 5, 8]);
    winningCombos.push([3, 6, 9]);
    winningCombos.push([1, 5, 9]);
    winningCombos.push([3, 5, 7]);
}


drawboard()
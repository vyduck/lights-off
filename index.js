let moves = 0;

let startbtn = document.getElementById("start");

let moveCounter = document.getElementById("movesCounter");
let game = document.getElementById("game");

let selectSize = document.getElementById("size");
let selectDifficulty = document.getElementById("difficulty");

startbtn.onclick =function () {
    let gridSize = Number(selectSize.value);
    let difficulty = Number(selectDifficulty.value);

    moves = 0;
    updateMoves();

    game.innerHTML = "";
    for (let i = 0; i < gridSize**2; i ++) {
        if (
            (i%gridSize == 0) &&
            i != 0
        ) game.innerHTML += "<br>";

        let tileElement = document.createElement("button");
        tileElement.classList.add("tile", "dark");
        tileElement.id = `${String(i/gridSize).split(".")[0]};${i%gridSize}`;
        tileElement.setAttribute("onclick", "btnClick(this);");

        game.appendChild(tileElement);
    }

    for (let i = 0; i < difficulty*Math.ceil((gridSize-3)/2); i++) {
        let randomBtn = document.getElementById([Math.round(Math.random()*(gridSize-1)), Math.round(Math.random()*(gridSize-1))].join(";"));
        toggle(randomBtn);
    }
}

function btnClick(button) {
    moves++;
    updateMoves();
    toggle(button);
    winCheck();
}

function toggle (button) {
    let coords = button.id.split(";");
    toggleBtn(button);

    const leftBtnId = `${coords[0]};${Number(coords[1])+1}`;
    let leftBtn = document.getElementById(leftBtnId);
    if (leftBtn) toggleBtn(leftBtn);

    const rightBtnId = `${coords[0]};${Number(coords[1])-1}`;
    let rightBtn = document.getElementById(rightBtnId);
    if (rightBtn) toggleBtn(rightBtn);

    const topBtnId = `${Number(coords[0])-1};${coords[1]}`;
    let topBtn = document.getElementById(topBtnId);
    if (topBtn) toggleBtn(topBtn);

    const bottomBtnId = `${Number(coords[0])+1};${coords[1]}`;
    let bottomBtn = document.getElementById(bottomBtnId);
    if (bottomBtn) toggleBtn(bottomBtn);
}

function toggleBtn(button) {
    if (button.classList.contains("light")) {
        button.classList.remove("light");
        button.classList.add("dark")
    } else if (button.classList.contains("dark")) {
        button.classList.remove("dark");
        button.classList.add("light")
    };
}

function updateMoves() {
    moveCounter.innerHTML = moves;
}

function winCheck () {
    let onTiles = document.getElementsByClassName("light");

    if (onTiles.length == 0) {
        alert(`You managed to turn off all the lights in ${moves} moves! Congrats!`);
        let tiles = document.getElementsByClassName("tile");
        for (let tile of tiles) {
            tile.setAttribute("disabled", "disabled");
        };
        moves = 0;
        updateMoves();
    }
}
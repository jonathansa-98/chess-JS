const CELL_NUM = 8;
window.onload = start;

function start() {
    console.log("start() called");
    paintBoard();
}

function paintBoard() {
    for (let i = 0; i < CELL_NUM; i++) {
        for (let k = 0; k < CELL_NUM; k++) {
            paintCell(i, k);
        }
    }
}

function paintCell(i,k) {
    var cell;
    cell = document.createElement("div");
    cell.id = i+" "+k;
    if ((i + k) % 2 == 0) {
        cell.className = "cell white";
    } else {
        cell.className = "cell black";
    }
    document.querySelector("#board").appendChild(cell);
}
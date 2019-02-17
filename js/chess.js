const BOARD_CELL_NUM = 64;

$(document).ready(function () {
    start();
});

function start() {
    console.log("start() called");
    paintBoard();
}

function paintBoard() {
    for (let i = 0; i < BOARD_CELL_NUM; i++) {
        paintCell(i);
    }
}

function paintCell(index) {
    var cell;
    cell = $("<div/>", {
        id: "" + index,
        class: "cell"
    });
    $("#board").append(cell);
}
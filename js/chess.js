/**** VARIABLES ****/
const NUM_CELDAS = 8;
const TABLERO = [];
const BLANCAS = [];
const NEGRAS = [];

/****************** */
/** preparacion inicial */
window.onload = start;

function start() {
    pintaTablero();
}

function pintaTablero() {
    creaNegras();
    creaBlancas();
    for (let x = 0; x < NUM_CELDAS; x++) {
        for (let y = 0; y < NUM_CELDAS; y++) {
            pintaCelda(x, y);
        }
    }
    pintaPiezas();
}

function creaNegras() {
    NEGRAS.push(new Pieza("0-0", "/img/NT.png", "negra"));
    NEGRAS.push(new Pieza("0-1", "/img/NC.png", "negra"));
    NEGRAS.push(new Pieza("0-2", "/img/NA.png", "negra"));
    NEGRAS.push(new Pieza("0-3", "/img/ND.png", "negra"));
    NEGRAS.push(new Pieza("0-4", "/img/NR.png", "negra"));
    NEGRAS.push(new Pieza("0-5", "/img/NA.png", "negra"));
    NEGRAS.push(new Pieza("0-6", "/img/NC.png", "negra"));
    NEGRAS.push(new Pieza("0-7", "/img/NT.png", "negra"));
    for (let i = 0; i < NUM_CELDAS; i++) {
        NEGRAS.push(new Pieza("1-"+i, "/img/NP.png", "negra"));
    }
}

function creaBlancas() {
    for (let i = 0; i < NUM_CELDAS; i++) {
        BLANCAS.push(new Pieza("7-" + i, "/img/BP.png", "blanca"));
    }
    BLANCAS.push(new Pieza("8-0", "/img/BT.png", "blanca"));
    BLANCAS.push(new Pieza("8-1", "/img/BC.png", "blanca"));
    BLANCAS.push(new Pieza("8-2", "/img/BA.png", "blanca"));
    BLANCAS.push(new Pieza("8-3", "/img/BD.png", "blanca"));
    BLANCAS.push(new Pieza("8-4", "/img/BR.png", "blanca"));
    BLANCAS.push(new Pieza("8-5", "/img/BA.png", "blanca"));
    BLANCAS.push(new Pieza("8-6", "/img/BC.png", "blanca"));
    BLANCAS.push(new Pieza("8-7", "/img/BT.png", "blanca"));
}

function pintaCelda(x, y) {
    var celda;
    celda = document.createElement("div");
    celda.id = x+"-"+y;
    if ((x + y) % 2 == 0) {
        celda.className = "celda blanca";
    } else {
        celda.className = "celda negra";
    }
    document.querySelector("#tablero").appendChild(celda);
}

function pintaPiezas() {

}

/**************************************************** */
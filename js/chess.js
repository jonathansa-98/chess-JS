/**** VARIABLES ****/
const NUM_CELDAS = 8;
const TABLERO = [];
const PIEZAS_BLANCAS = [];
const PIEZAS_NEGRAS = [];
const TEAM_BLANCAS = -1;
const TEAM_NEGRAS = 1;

let celdas;

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
    PIEZAS_NEGRAS.push(new Torre("0-0", "img/NT.png", TEAM_NEGRAS));
    PIEZAS_NEGRAS.push(new Caballo("0-1", "img/NC.png", TEAM_NEGRAS));
    PIEZAS_NEGRAS.push(new Alfil("0-2", "img/NA.png", TEAM_NEGRAS));
    PIEZAS_NEGRAS.push(new Dama("0-3", "img/ND.png", TEAM_NEGRAS));
    PIEZAS_NEGRAS.push(new Re("0-4", "img/NR.png", TEAM_NEGRAS));
    PIEZAS_NEGRAS.push(new Pieza("0-5", "img/NA.png", TEAM_NEGRAS));
    PIEZAS_NEGRAS.push(new Pieza("0-6", "img/NC.png", TEAM_NEGRAS));
    PIEZAS_NEGRAS.push(new Pieza("0-7", "img/NT.png", TEAM_NEGRAS));
    for (let i = 0; i < NUM_CELDAS; i++) {
        PIEZAS_NEGRAS.push(new Pieza("1-"+i, "img/NP.png", TEAM_NEGRAS));
    }
}

function creaBlancas() {
    for (let i = 0; i < NUM_CELDAS; i++) {
        PIEZAS_BLANCAS.push(new Pieza("7-" + i, "img/BP.png", TEAM_BLANCAS));
    }
    PIEZAS_BLANCAS.push(new Pieza("8-0", "img/BT.png", TEAM_BLANCAS));
    PIEZAS_BLANCAS.push(new Pieza("8-1", "img/BC.png", TEAM_BLANCAS));
    PIEZAS_BLANCAS.push(new Pieza("8-2", "img/BA.png", TEAM_BLANCAS));
    PIEZAS_BLANCAS.push(new Pieza("8-3", "img/BD.png", TEAM_BLANCAS));
    PIEZAS_BLANCAS.push(new Pieza("8-4", "img/BR.png", TEAM_BLANCAS));
    PIEZAS_BLANCAS.push(new Pieza("8-5", "img/BA.png", TEAM_BLANCAS));
    PIEZAS_BLANCAS.push(new Pieza("8-6", "img/BC.png", TEAM_BLANCAS));
    PIEZAS_BLANCAS.push(new Pieza("8-7", "img/BT.png", TEAM_BLANCAS));
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
    celdas = document.querySelectorAll("#tablero > div");
    // espacio negras
    for (let n = 0; n < PIEZAS_NEGRAS.length; n++) {
        TABLERO.push(PIEZAS_NEGRAS[n]);
    }
    // espacio vacio
    for (let i = 0; i < NUM_CELDAS/2; i++) {
        for (let vacio = 0; vacio < NUM_CELDAS; vacio++) {
            TABLERO.push(new Pieza());
        }
    }
    // espacio blancas
    for (let b = 0; b < PIEZAS_BLANCAS.length; b++) {
        TABLERO.push(PIEZAS_BLANCAS[b]);
    }
    // pinta tablero entero
    pintaUI();
    console.log(TABLERO);
    // movimiento de prueba
    setTimeout(() => {
        mueveCelda(Math.floor(Math.random() * 64), Math.floor(Math.random() * 64));
        pintaUI();
        console.log(TABLERO);
    }, 1000);
}

function mueveCelda(n1, n2) {
    [TABLERO[n1], TABLERO[n2]] = [TABLERO[n2], TABLERO[n1]];
}

function pintaUI() {
    for (let c = 0; c < celdas.length; c++) {
        celdas[c].style.backgroundImage = `url('${TABLERO[c].img}')`;
    }
}
/**************************************************** */
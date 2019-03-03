/**** VARIABLES ****/
const NUM_CELDAS = 8;
const TABLERO = [];
const PIEZAS_BLANCAS = [];
const PIEZAS_NEGRAS = [];
const TEAM_BLANCAS = -1;
const TEAM_NEGRAS = 1;
const TABLERO_DOM = document.querySelector("#tablero");

let celdas;

/****************** */
/** preparacion inicial */
window.onload = start;

function start() {
    pintaTablero();
}

function creaNegras() {
    PIEZAS_NEGRAS.push(new Torre("1-1", "img/NT.png", TEAM_NEGRAS));
    PIEZAS_NEGRAS.push(new Caballo("1-2", "img/NC.png", TEAM_NEGRAS));
    PIEZAS_NEGRAS.push(new Alfil("1-3", "img/NA.png", TEAM_NEGRAS));
    PIEZAS_NEGRAS.push(new Dama("1-4", "img/ND.png", TEAM_NEGRAS));
    PIEZAS_NEGRAS.push(new Rey("1-5", "img/NR.png", TEAM_NEGRAS));
    PIEZAS_NEGRAS.push(new Alfil("1-6", "img/NA.png", TEAM_NEGRAS));
    PIEZAS_NEGRAS.push(new Caballo("1-7", "img/NC.png", TEAM_NEGRAS));
    PIEZAS_NEGRAS.push(new Torre("1-8", "img/NT.png", TEAM_NEGRAS));
    for (let i = 1; i <= NUM_CELDAS; i++) {
        PIEZAS_NEGRAS.push(new Peon("2-" + i, "img/NP.png", TEAM_NEGRAS));
    }
}

function creaBlancas() {
    for (let i = 1; i <= NUM_CELDAS; i++) {
        PIEZAS_BLANCAS.push(new Peon("7-" + i, "img/BP.png", TEAM_BLANCAS));
    }
    PIEZAS_BLANCAS.push(new Torre("8-1", "img/BT.png", TEAM_BLANCAS));
    PIEZAS_BLANCAS.push(new Caballo("8-2", "img/BC.png", TEAM_BLANCAS));
    PIEZAS_BLANCAS.push(new Alfil("8-3", "img/BA.png", TEAM_BLANCAS));
    PIEZAS_BLANCAS.push(new Dama("8-4", "img/BD.png", TEAM_BLANCAS));
    PIEZAS_BLANCAS.push(new Rey("8-5", "img/BR.png", TEAM_BLANCAS));
    PIEZAS_BLANCAS.push(new Alfil("8-6", "img/BA.png", TEAM_BLANCAS));
    PIEZAS_BLANCAS.push(new Caballo("8-7", "img/BC.png", TEAM_BLANCAS));
    PIEZAS_BLANCAS.push(new Torre("8-8", "img/BT.png", TEAM_BLANCAS));
}

function pintaTablero() {
    creaNegras();
    creaBlancas();
    for (let x = 1; x <= NUM_CELDAS; x++) {
        for (let y = 1; y <= NUM_CELDAS; y++) {
            pintaCelda(x, y);
        }
    }
    pintaPiezas();
}

function pintaCelda(x, y) {
    var celda;
    celda = document.createElement("div");
    celda.id = x + "-" + y;
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
    TABLERO.push(new Array());
    TABLERO.push(new Array());
    for (let n = 0; n < NUM_CELDAS; n++) {
        TABLERO[0].push(PIEZAS_NEGRAS[n]);
        TABLERO[1].push(PIEZAS_NEGRAS[n + 8]);
    }
    // espacio vacio
    for (let i = 2; i < NUM_CELDAS - 2; i++) {
        TABLERO.push(new Array());
        for (let vacio = 0; vacio < NUM_CELDAS; vacio++) {
            TABLERO[i].push(new Pieza(i + 1 + "-" + (vacio + 1)));
        }
    }
    TABLERO.push(new Array());
    TABLERO.push(new Array());
    for (let b = 0; b < NUM_CELDAS; b++) {
        TABLERO[6].push(PIEZAS_BLANCAS[b]);
        TABLERO[7].push(PIEZAS_BLANCAS[b + NUM_CELDAS]);
    }
    // pinta tablero entero
    console.log(TABLERO);
    pintaUI();
    // movimiento de prueba
    setTimeout(() => {
        mueveCelda(random(8, 1), random(8, 1), random(8, 1), random(8, 1));
        mueveCelda(2, 2, 5, 3);
        pintaUI();
        console.log(TABLERO);
    }, 1000);
}

function random(casillas, start) {
    return Math.floor(Math.random() * casillas + start)
}

function mueveCelda(x1, y1, x2, y2) {
    x1 -= 1; y1 -= 1; x2 -= 1; y2 -= 1;
    [TABLERO[x1][y1].img, TABLERO[x2][y2].img] = [TABLERO[x2][y2].img, TABLERO[x1][y1].img];
    [TABLERO[x1][y1].equipo, TABLERO[x2][y2].equipo] = [TABLERO[x2][y2].equipo, TABLERO[x1][y1].equipo];
}

function pintaUI() {
    for (let x = 0; x < NUM_CELDAS; x++) {
        for (let y = 0; y < NUM_CELDAS; y++) {
            if (TABLERO[x][y].img != ""){
                celdas[(8 * x) + y].classList.add("pieza");
            } else {
                celdas[(8 * x) + y].classList.remove("pieza");
            }
            celdas[(8 * x) + y].style.backgroundImage = `url('${TABLERO[x][y].img}')`;
        }
    }
}
/**************************************************** */
// addEventListener a piezas en tablero
TABLERO_DOM.addEventListener('click', e => {
    var celda = e.target;
    if (celda.classList.contains('pieza')) {
        const pieza = getPiezaEnTABLERO(celda);
        console.log(pieza);
        //compruevaMovimientos(celda);
    }
});

function getPiezaEnTABLERO(celda) {
    for (const fila of TABLERO) {
        for (const elemento of fila) {
            if (celda.id === elemento.id) {
                return elemento;
            }
        }
    }
}
/**** VARIABLES ****/
const NUM_CELDAS = 8;
const TABLERO = [];
const PIEZAS_BLANCAS = [];
const PIEZAS_NEGRAS = [];
const TEAM_BLANCAS = -1;
const TEAM_NEGRAS = 1;
const TABLERO_DOM = document.querySelector("#tablero");
var pieza;
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
}

function random(casillas, start) {
    return Math.floor(Math.random() * casillas + start)
}

function mueveCelda(x1, y1, x2, y2) {
    x1 -= 1; y1 -= 1; x2 -= 1; y2 -= 1;
    var aux1 = copia(TABLERO[x1][y1]);
    var aux2 = copia(TABLERO[x2][y2]);
    var id1 = aux1.id;
    var id2 = aux2.id;
    TABLERO[x1][y1] = aux2;
    TABLERO[x2][y2] = aux1;
    TABLERO[x2][y2].id = id2;
    TABLERO[x1][y1].id = id1;
}

function copia(src) {
    switch(src.constructor.name) {
        case "Pieza":
            return new Pieza(src.id, src.img, src.equipo);
        case "Peon":
            return new Peon(src.id, src.img, src.equipo);
        case "Torre":
            return new Torre(src.id, src.img, src.equipo);
        case "Caballo":
            return new Caballo(src.id, src.img, src.equipo);
        case "Alfil":
            return new Alfil(src.id, src.img, src.equipo);
        case "Dama":
            return new Dama(src.id, src.img, src.equipo);
        case "Rey":
            return new Rey(src.id, src.img, src.equipo);
    }
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
    celdas = document.querySelectorAll("#tablero > div");
    var celda = e.target;
    if (celda.classList.contains('pieza')) {
        celdas.forEach(ele => {
            ele.classList.remove("marcador");
        });
        pieza = getPiezaEnTABLERO(celda);
        console.log(pieza.constructor.name);
        console.log(pieza);
        var mov = pieza.getMovPosibles();
        for (let i = 0; i < mov.length; i++) {
            celdas[8 * mov[i][0] + mov[i][1] - 9].classList.add("marcador");
        }
    } else if (celda.classList.contains('marcador')) {
        var coord_m = celda.id.split("-");
        var coord_p = pieza.id.split("-");
        coord_m = coord_m.map(Number);
        coord_p = coord_p.map(Number);
        mueveCelda(coord_p[0], coord_p[1], coord_m[0], coord_m[1]);
        pintaUI();
        celdas.forEach(ele => {
            ele.classList.remove("marcador");
        });
        console.log(TABLERO);
    } else {
        celdas.forEach(ele => {
            ele.classList.remove("marcador");
        });
    }
});

function getPiezaEnTABLERO(celda) {
    for (let x = 0; x < TABLERO.length; x++) {
        for (let y = 0; y < TABLERO[x].length; y++) {
            if (celda.id === (x+1)+"-"+(y+1)) {
                return TABLERO[x][y];
            }
        }
    }

/*
    for (const fila of TABLERO) {
        for (const elemento of fila) {
            if (celda.id === elemento.id) {
                return elemento;
            }
        }
    }*/
}
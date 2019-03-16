/**** VARIABLES ****/
const NUM_CELDAS = 8;
const TABLERO = [];
const PIEZAS_BLANCAS = [];
const PIEZAS_NEGRAS = [];
const TEAM_BLANCAS = -1;
const TEAM_NEGRAS = 1;
const TABLERO_DOM = document.querySelector("#tablero");
let pieza;
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

function mueveCelda(x1, y1, x2, y2) {
    x1--; y1--; x2--; y2--;
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
            return new Peon(src.id, src.img, src.equipo, ++src.move);
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
    var coord_m;
    var coord_p;
    // ataque a pieza
    if (celda.classList.contains('pieza') && celda.classList.contains('marcador')) {
        coord_m = celda.id.split("-").map(Number);
        coord_p = pieza.id.split("-").map(Number);
        matar(coord_m);
        mueveCelda(coord_p[0], coord_p[1], coord_m[0], coord_m[1]);
        pintaUI();
        celdas.forEach(ele => {
            ele.classList.remove("marcador");
        });
        comprovarCoronacionPeon(coord_m);
    // selecciona pieza
    } else if (celda.classList.contains('pieza')) {
        celdas.forEach(ele => {
            ele.classList.remove("marcador");
        });
        pieza = getPiezaEnTABLERO(celda);
        var mov = pieza.getMovPosibles();
        for (let i = 0; i < mov.length; i++) {
            celdas[8 * mov[i][0] + mov[i][1] - 9].classList.add("marcador");
        }
    // gestiona movimiento de la pieza seleccionada
    } else if (celda.classList.contains('marcador')) {
        coord_m = celda.id.split("-").map(Number);
        coord_p = pieza.id.split("-").map(Number);
        mueveCelda(coord_p[0], coord_p[1], coord_m[0], coord_m[1]);
        pintaUI();
        celdas.forEach(ele => {
            ele.classList.remove("marcador");
        });
        comprovarCoronacionPeon(coord_m);
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
}

function matar(coord_destino) {
    x = coord_destino[0];
    y = coord_destino[1];
    var vacia = new Pieza(`${x}-${y}`);
    x--; y--;
    TABLERO[x][y] = vacia;
}

function comprovarCoronacionPeon(coord_m) {
    if(pieza.constructor.name == "Peon"){
        var aux = TABLERO[coord_m[0] - 1][coord_m[1] - 1];
        pieza = new Peon(aux.id, aux.img, aux.equipo);
        // coronar peon blanco
        if(coord_m[0] == 1) verDialogCanviarPieza();
        // coronar peon negro
        else if(coord_m[0] == 8) verDialogCanviarPieza();
    }
}

function verDialogCanviarPieza() {
    var modal = document.getElementById('change-piece');
    var modal_body = document.querySelector('#change-piece .modal-body');
    var div;
    // abre modal
    // pinta piezas disponibles
    if(pieza.equipo == TEAM_NEGRAS){
        for (let n = 0; n < 4; n++) {
            div = document.createElement("div");
            div.className = "eleccion";
            div.style.backgroundImage = `url('${PIEZAS_NEGRAS[n].img}')`;
            modal_body.appendChild(div);
        }
    } else if (pieza.equipo == TEAM_BLANCAS) {
        for (let n = 8; n < 12; n++) {
            div = document.createElement("div");
            div.className = "eleccion";
            div.style.backgroundImage = `url('${PIEZAS_BLANCAS[n].img}')`;
            modal_body.appendChild(div);
        }
    }
    modal.style.display = "block";
    modal_body.addEventListener('click', e => {
        var elegida = e.target;
        if (elegida.className == "eleccion") {
            var img = elegida.style.backgroundImage.substring(5, 15);
            var team;
            var coord = pieza.id.split("-").map(Number);
            // cojer equipo
            if(img.charAt(4) == 'N') {team = TEAM_NEGRAS;}
            else if(img.charAt(4) == 'B') {team = TEAM_BLANCAS;}
            // cojer pieza elegida
            switch (img.charAt(5)) {
                case "T":
                    TABLERO[coord[0]-1][coord[1]-1] = new Torre(coord[0]+"-"+coord[1], img, team);
                    break;
                case "C":
                    TABLERO[coord[0]-1][coord[1]-1] = new Caballo(coord[0]+"-"+coord[1], img, team);
                    break;
                case "A":
                    TABLERO[coord[0]-1][coord[1]-1] = new Alfil(coord[0]+"-"+coord[1], img, team);
                    break;
                case "D":
                    TABLERO[coord[0]-1][coord[1]-1] = new Dama(coord[0]+"-"+coord[1], img, team);
                    break;
            }
            pintaUI();
            // cerrar modal
            while (modal_body.hasChildNodes()) {
                modal_body.removeChild(modal_body.firstChild);
            }
            modal.style.display = "none";
        }
    });
}
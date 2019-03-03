function Pieza(id, img, equipo) {
    this.id = id || "";
    this.img = img || ""; // imagen de la pieza en el tablero.
    this.equipo = equipo || 0; // -1 == blancas && 1 == negras && 0 vacio.
}

Pieza.prototype.print = function () {
    return `ID: ${this.id} Img: ${this.img} Equipo: ${this.equipo}`;
}

/** Peon */
Peon.prototype = new Pieza();
Peon.prototype.constructor = Peon;

function Peon(id, img, equipo) {
    Pieza.call(this, id, img, equipo);
}

/*Peon.prototype.movimientosPosibles = function(x, y) {

}*/

Peon.prototype.mover = function(x, y) {
    if(x >= 1 && x <= 8 && y >= 1 && y <= 8){
        return "2 primer turno, luego 1 delante o ataca diagonal";
    }
};
/******************* */
/** Torre */
Torre.prototype = new Pieza();
Torre.prototype.constructor = Torre;

function Torre(id, img, equipo) {
    Pieza.call(this, id, img, equipo);
}

Torre.prototype.mover = function(x, y) {
    if(x >= 1 && x <= 8 && y >= 1 && y <= 8){
        return "infinito recto";
    }
};
/******************* */
/** Caballo */
Caballo.prototype = new Pieza();
Caballo.prototype.constructor = Caballo;

function Caballo(id, img, equipo) {
    Pieza.call(this, id, img, equipo);
}

Caballo.prototype.mover = function(x, y) {
    if(x >= 1 && x <= 8 && y >= 1 && y <= 8){
        return "en L";
    }
};
/******************* */
/** Alfil */
Alfil.prototype = new Pieza();
Alfil.prototype.constructor = Alfil;

function Alfil(id, img, equipo) {
    Pieza.call(this, id, img, equipo);
}

Alfil.prototype.mover = function(x, y) {
    if(x >= 1 && x <= 8 && y >= 1 && y <= 8){
        return "en diagonal";
    }
};
/******************* */
/** Dama */
Dama.prototype = new Pieza();
Dama.prototype.constructor = Dama;

function Dama(id, img, equipo) {
    Pieza.call(this, id, img, equipo);
}

Dama.prototype.mover = function(x, y) {
    if(x >= 1 && x <= 8 && y >= 1 && y <= 8){
        return "infinito en diagonal, vertical y horizontal";
    }
};
/******************* */
/** Rey */
Rey.prototype = new Pieza();
Rey.prototype.constructor = Rey;

function Rey(id, img, equipo) {
    Pieza.call(this, id, img, equipo);
}

Rey.prototype.mover = function(x, y) {
    if(x >= 1 && x <= 8 && y >= 1 && y <= 8){
        return "cualquier alrededor suyo 1 celda";
    }
};
/******************* */
function Pieza(id, img, equipo) {
    this.id = id || "";
    this.img = img || ""; // imagen de la pieza en el tablero.
    this.equipo = equipo || 0; // -1 == blancas && 1 == negras && 0 vacio.
}

Pieza.prototype.toString = function () {
    return `ID: ${this.id} Img: ${this.img} Equipo: ${this.equipo}`;
}

/** Peon */
Peon.prototype = new Pieza();
Peon.prototype.constructor = Peon;

function Peon(id, img, equipo, move) {
    Pieza.call(this, id, img, equipo);
    this.move = move || 0;
}

// devuelve un array con las coordenadas de cada posicion posible
Peon.prototype.getMovPosibles = function() {
    var pos = [];
    var posibles = [];
    if (this.equipo == TEAM_NEGRAS) {
        pos = this.id.split("-");
        pos = pos.map(Number);
        pos[0] += 1;
        posibles.push(pos.slice(0));
        if(this.move < 1) {
            pos[0] +=1;
            posibles.push(pos.slice(0));
        }
    } else if (this.equipo == TEAM_BLANCAS) {
        pos = this.id.split("-");
        pos = pos.map(Number);
        pos[0] -= 1;
        posibles.push(pos.slice(0));
        if (this.move < 1) {
            pos[0] -= 1;
            posibles.push(pos.slice(0));
        }
    }
    //console.log(posibles);
    return posibles;
};
/******************* */
/** Torre */
Torre.prototype = new Pieza();
Torre.prototype.constructor = Torre;

function Torre(id, img, equipo) {
    Pieza.call(this, id, img, equipo);
}

// devuelve un array con las coordenadas de cada posicion posible
Torre.prototype.getMovPosibles = function () {
    var pos = [];
    var posibles = [];
    // arriba
    pos = this.id.split("-").map(Number);
    while(pos[0] > 1) {
        pos[0] -= 1;
        posibles.push(pos.slice(0));
    }
    // abajo
    pos = this.id.split("-").map(Number);
    while(pos[0] < 8) {
        pos[0] += 1;
        posibles.push(pos.slice(0));
    }
    // izquierda
    pos = this.id.split("-").map(Number);
    while(pos[1] > 1) {
        pos[1] -= 1;
        posibles.push(pos.slice(0));
    }
    // abajo
    pos = this.id.split("-").map(Number);
    while(pos[1] < 8) {
        pos[1] += 1;
        posibles.push(pos.slice(0));
    }
    //console.log(posibles);
    return posibles;
}

Torre.prototype.calcCollision = function () {

}
/******************* */
/** Caballo */
Caballo.prototype = new Pieza();
Caballo.prototype.constructor = Caballo;

function Caballo(id, img, equipo) {
    Pieza.call(this, id, img, equipo);
}

Caballo.prototype.getMovPosibles = function () {
    var pos = [];
    var posibles = [];
    pos = this.id.split("-").map(Number);
    if (pos[0] < 7 && pos[1] < 8) { // abajo derecha
        pos[0] += 2;
        pos[1] += 1;
        posibles.push(pos.slice(0));
    }
    pos = this.id.split("-").map(Number);
    if (pos[0] < 7 && pos[1] > 1) { // abajo izquierda
        pos[0] += 2;
        pos[1] -= 1;
        posibles.push(pos.slice(0));
    }
    pos = this.id.split("-").map(Number);
    if (pos[0] < 8 && pos[1] > 2) { // izquierda abajo
        pos[0] += 1;
        pos[1] -= 2;
        posibles.push(pos.slice(0));
    }
    pos = this.id.split("-").map(Number);
    if (pos[0] > 1 && pos[1] > 2) { // izquierda arriba
        pos[0] -= 1;
        pos[1] -= 2;
        posibles.push(pos.slice(0));
    }
    pos = this.id.split("-").map(Number);
    if (pos[0] > 2 && pos[1] > 1) { // arriba izquierda
        pos[0] -= 2;
        pos[1] -= 1;
        posibles.push(pos.slice(0));
    }
    pos = this.id.split("-").map(Number);
    if (pos[0] > 2 && pos[1] < 8) { // arriba izquierda
        pos[0] -= 2;
        pos[1] += 1;
        posibles.push(pos.slice(0));
    }
    pos = this.id.split("-").map(Number);
    if (pos[0] > 1 && pos[1] < 7) { // derecha arriba
        pos[0] -= 1;
        pos[1] += 2;
        posibles.push(pos.slice(0));
    }
    pos = this.id.split("-").map(Number);
    if (pos[0] < 8 && pos[1] < 7) { // derecha abajo
        pos[0] += 1;
        pos[1] += 2;
        posibles.push(pos.slice(0));
    }
    //console.log(posibles);
    return posibles;
}
/******************* */
/** Alfil */
Alfil.prototype = new Pieza();
Alfil.prototype.constructor = Alfil;

function Alfil(id, img, equipo) {
    Pieza.call(this, id, img, equipo);
}

Alfil.prototype.getMovPosibles = function () {
    var pos = [];
    var posibles = [];
    // arriba izquierda
    pos = this.id.split("-").map(Number);
    while (pos[0] > 1 && pos[1] > 1) {
        pos[0] -= 1;
        pos[1] -= 1;
        posibles.push(pos.slice(0));
    }
    // arriba derecha
    pos = this.id.split("-").map(Number);
    while (pos[0] > 1 && pos[1] < 8) {
        pos[0] -= 1;
        pos[1] += 1;
        posibles.push(pos.slice(0));
    }
    // abajo izquierda
    pos = this.id.split("-").map(Number);
    while (pos[0] < 8 && pos[1] > 1) {
        pos[0] += 1;
        pos[1] -= 1;
        posibles.push(pos.slice(0));
    }
    // abajo derecha
    pos = this.id.split("-").map(Number);
    while (pos[0] < 8 && pos[1] < 8) {
        pos[0] += 1;
        pos[1] += 1;
        posibles.push(pos.slice(0));
    }
    //console.log(posibles);
    return posibles;
}
/******************* */
/** Dama */
Dama.prototype = new Pieza();
Dama.prototype.constructor = Dama;

function Dama(id, img, equipo) {
    Pieza.call(this, id, img, equipo);
}
Dama.prototype.getMovPosibles = function () {
    var pos = [];
    var posibles = [];
    // arriba
    pos = this.id.split("-").map(Number);
    while (pos[0] > 1) {
        pos[0] -= 1;
        posibles.push(pos.slice(0));
    }
    // abajo
    pos = this.id.split("-").map(Number);
    while (pos[0] < 8) {
        pos[0] += 1;
        posibles.push(pos.slice(0));
    }
    // izquierda
    pos = this.id.split("-").map(Number);
    while (pos[1] > 1) {
        pos[1] -= 1;
        posibles.push(pos.slice(0));
    }
    // abajo
    pos = this.id.split("-").map(Number);
    while (pos[1] < 8) {
        pos[1] += 1;
        posibles.push(pos.slice(0));
    }
    // arriba izquierda
    pos = this.id.split("-").map(Number);
    while (pos[0] > 1 && pos[1] > 1) {
        pos[0] -= 1;
        pos[1] -= 1;
        posibles.push(pos.slice(0));
    }
    // arriba derecha
    pos = this.id.split("-").map(Number);
    while (pos[0] > 1 && pos[1] < 8) {
        pos[0] -= 1;
        pos[1] += 1;
        posibles.push(pos.slice(0));
    }
    // abajo izquierda
    pos = this.id.split("-").map(Number);
    while (pos[0] < 8 && pos[1] > 1) {
        pos[0] += 1;
        pos[1] -= 1;
        posibles.push(pos.slice(0));
    }
    // abajo derecha
    pos = this.id.split("-").map(Number);
    while (pos[0] < 8 && pos[1] < 8) {
        pos[0] += 1;
        pos[1] += 1;
        posibles.push(pos.slice(0));
    }
    //console.log(posibles);
    return posibles;
}
/******************* */
/** Rey */
Rey.prototype = new Pieza();
Rey.prototype.constructor = Rey;

function Rey(id, img, equipo) {
    Pieza.call(this, id, img, equipo);
}

Rey.prototype.getMovPosibles = function () {
    var pos = [];
    var posibles = [];
    pos = this.id.split("-").map(Number);
    if (pos[0] > 1) { // arriba
        pos[0] -= 1;
        posibles.push(pos.slice(0));
    }
    pos = this.id.split("-").map(Number);
    if (pos[0] < 8) { // abajo
        pos[0] += 1;
        posibles.push(pos.slice(0));
    }
    pos = this.id.split("-").map(Number);
    if (pos[1] > 1) { // izquierda
        pos[1] -= 1;
        posibles.push(pos.slice(0));
    }
    pos = this.id.split("-").map(Number);
    if (pos[1] < 8) { // derecha
        pos[1] += 1;
        posibles.push(pos.slice(0));
    }
    pos = this.id.split("-").map(Number);
    if (pos[0] > 1 && pos[1] < 8) { // arriba derecha
        pos[0] -= 1;
        pos[1] += 1;
        posibles.push(pos.slice(0));
    }
    pos = this.id.split("-").map(Number);
    if (pos[0] < 8 && pos[1] < 8) { // abajo derecha
        pos[0] += 1;
        pos[1] += 1;
        posibles.push(pos.slice(0));
    }
    pos = this.id.split("-").map(Number);
    if (pos[0] < 8 && pos[1] > 1) { // abajo izquierda
        pos[0] += 1;
        pos[1] -= 1;
        posibles.push(pos.slice(0));
    }
    pos = this.id.split("-").map(Number);
    if (pos[0] > 1 && pos[1] > 1) { // arriba izquierda
        pos[0] -= 1;
        pos[1] -= 1;
        posibles.push(pos.slice(0));
    }
    //console.log(posibles);
    return posibles;
}
/******************* */
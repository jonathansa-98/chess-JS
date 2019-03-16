function Pieza(id, img, equipo) {
    this.id = id || "";
    this.img = img || ""; // imagen de la pieza en el tablero.
    this.equipo = equipo || 0; // -1 == blancas && 1 == negras && 0 vacio.
}

/* devuelve: 1 = colisiona con pieza del mismo equipo
            -1 = colisiona con pieza del otro equipo
            0 = no colisiona*/
Pieza.prototype.calcCollision = function (pos) {
    var pieza = this;
    var x = pos[0] - 1;
    var y = pos[1] - 1;
    //console.log(`x: ${x}, y: ${y}`);
    //console.log(TABLERO[x][y]);
    if (TABLERO[x][y].equipo == pieza.equipo) {
        return 1;
    } else if (TABLERO[x][y].equipo != 0 &&
        TABLERO[x][y].equipo != pieza.equipo) {
        return -1;
    } else {
        return 0;
    }
};

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

Peon.prototype.calcAtaquesPosibles = function(pos, posibles) {
    var posicion = pos.slice();
    if(this.equipo == TEAM_NEGRAS) {
        try{
            posicion[0] += 1;
            posicion[1] -= 1;
            if (this.calcCollision(posicion) == -1) {
                posibles.push(posicion.slice(0));
            }
        } catch(e) {}
        posicion = pos.slice();
        try {
            posicion[0] += 1;
            posicion[1] += 1;
            if (this.calcCollision(posicion) == -1) {
                posibles.push(posicion.slice(0));
            }
        } catch (e) {}
    } else if (this.equipo == TEAM_BLANCAS) {
        try {
            posicion[0] -= 1;
            posicion[1] -= 1;
            if (this.calcCollision(posicion) == -1) {
                posibles.push(posicion.slice(0));
            }
        } catch (e) {}
        posicion = pos.slice();
        try {
            posicion[0] -= 1;
            posicion[1] += 1;
            if (this.calcCollision(posicion) == -1) {
                posibles.push(posicion.slice(0));
            }
        } catch (e) {}
    }
};

// devuelve un array con las coordenadas de cada posicion posible
Peon.prototype.getMovPosibles = function() {
    var pos = [];
    var posibles = [];
    pos = this.id.split("-");
    pos = pos.map(Number);
    this.calcAtaquesPosibles(pos, posibles);
    try{
        if (this.equipo == TEAM_NEGRAS) {
            pos[0] += 1;
            if (this.calcCollision(pos) == 0){
                posibles.push(pos.slice(0));
                if(this.move < 1) {
                    pos[0] +=1;
                    if (this.calcCollision(pos) == 0) {
                        posibles.push(pos.slice(0));
                    }
                }
            }
        } else if (this.equipo == TEAM_BLANCAS) {
            pos[0] -= 1;
            if (this.calcCollision(pos) == 0) {
                posibles.push(pos.slice(0));
                if (this.move < 1) {
                    pos[0] -= 1;
                    if (this.calcCollision(pos) == 0) {
                        posibles.push(pos.slice(0));
                    }
                }
            }
        }
    } catch(e){}
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
        // calcular colision con fichas
        posibles.push(pos.slice(0));
        if (this.calcCollision(pos) == 1){
            posibles.splice(-1, 1);break;
        } else if (this.calcCollision(pos) == -1) break;
    }
    // abajo
    pos = this.id.split("-").map(Number);
    while(pos[0] < 8) {
        pos[0] += 1;
        posibles.push(pos.slice(0));
        if (this.calcCollision(pos) == 1) {
            posibles.splice(-1, 1); break;
        } else if (this.calcCollision(pos) == -1) break;
    }
    // izquierda
    pos = this.id.split("-").map(Number);
    while(pos[1] > 1) {
        pos[1] -= 1;
        posibles.push(pos.slice(0));
        if (this.calcCollision(pos) == 1) {
            posibles.splice(-1, 1); break;
        } else if (this.calcCollision(pos) == -1) break;
    }
    // abajo
    pos = this.id.split("-").map(Number);
    while(pos[1] < 8) {
        pos[1] += 1;
        posibles.push(pos.slice(0));
        if (this.calcCollision(pos) == 1) {
            posibles.splice(-1, 1); break;
        } else if (this.calcCollision(pos) == -1) break;
    }
    //console.log(posibles);
    return posibles;
};

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
        if (this.calcCollision(pos) == 1) posibles.splice(-1, 1);
    }
    pos = this.id.split("-").map(Number);
    if (pos[0] < 7 && pos[1] > 1) { // abajo izquierda
        pos[0] += 2;
        pos[1] -= 1;
        posibles.push(pos.slice(0));
        if (this.calcCollision(pos) == 1) posibles.splice(-1, 1);
    }
    pos = this.id.split("-").map(Number);
    if (pos[0] < 8 && pos[1] > 2) { // izquierda abajo
        pos[0] += 1;
        pos[1] -= 2;
        posibles.push(pos.slice(0));
        if (this.calcCollision(pos) == 1) posibles.splice(-1, 1);
    }
    pos = this.id.split("-").map(Number);
    if (pos[0] > 1 && pos[1] > 2) { // izquierda arriba
        pos[0] -= 1;
        pos[1] -= 2;
        posibles.push(pos.slice(0));
        if (this.calcCollision(pos) == 1) posibles.splice(-1, 1);
    }
    pos = this.id.split("-").map(Number);
    if (pos[0] > 2 && pos[1] > 1) { // arriba izquierda
        pos[0] -= 2;
        pos[1] -= 1;
        posibles.push(pos.slice(0));
        if (this.calcCollision(pos) == 1) posibles.splice(-1, 1);
    }
    pos = this.id.split("-").map(Number);
    if (pos[0] > 2 && pos[1] < 8) { // arriba izquierda
        pos[0] -= 2;
        pos[1] += 1;
        posibles.push(pos.slice(0));
        if (this.calcCollision(pos) == 1) posibles.splice(-1, 1);
    }
    pos = this.id.split("-").map(Number);
    if (pos[0] > 1 && pos[1] < 7) { // derecha arriba
        pos[0] -= 1;
        pos[1] += 2;
        posibles.push(pos.slice(0));
        if (this.calcCollision(pos) == 1) posibles.splice(-1, 1);
    }
    pos = this.id.split("-").map(Number);
    if (pos[0] < 8 && pos[1] < 7) { // derecha abajo
        pos[0] += 1;
        pos[1] += 2;
        posibles.push(pos.slice(0));
        if (this.calcCollision(pos) == 1) posibles.splice(-1, 1);
    }
    //console.log(posibles);
    return posibles;
};
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
        if (this.calcCollision(pos) == 1) {
            posibles.splice(-1, 1); break;
        } else if (this.calcCollision(pos) == -1) break;

    }
    // arriba derecha
    pos = this.id.split("-").map(Number);
    while (pos[0] > 1 && pos[1] < 8) {
        pos[0] -= 1;
        pos[1] += 1;
        posibles.push(pos.slice(0));
        if (this.calcCollision(pos) == 1) {
            posibles.splice(-1, 1); break;
        } else if (this.calcCollision(pos) == -1) break;
    }
    // abajo izquierda
    pos = this.id.split("-").map(Number);
    while (pos[0] < 8 && pos[1] > 1) {
        pos[0] += 1;
        pos[1] -= 1;
        posibles.push(pos.slice(0));
        if (this.calcCollision(pos) == 1) {
            posibles.splice(-1, 1); break;
        } else if (this.calcCollision(pos) == -1) break;
    }
    // abajo derecha
    pos = this.id.split("-").map(Number);
    while (pos[0] < 8 && pos[1] < 8) {
        pos[0] += 1;
        pos[1] += 1;
        posibles.push(pos.slice(0));
        if (this.calcCollision(pos) == 1) {
            posibles.splice(-1, 1); break;
        } else if (this.calcCollision(pos) == -1) break;
    }
    //console.log(posibles);
    return posibles;
};
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
        if (this.calcCollision(pos) == 1) {
            posibles.splice(-1, 1); break;
        } else if (this.calcCollision(pos) == -1) break;
    }
    // abajo
    pos = this.id.split("-").map(Number);
    while (pos[0] < 8) {
        pos[0] += 1;
        posibles.push(pos.slice(0));
        if (this.calcCollision(pos) == 1) {
            posibles.splice(-1, 1); break;
        } else if (this.calcCollision(pos) == -1) break;
    }
    // izquierda
    pos = this.id.split("-").map(Number);
    while (pos[1] > 1) {
        pos[1] -= 1;
        posibles.push(pos.slice(0));
        if (this.calcCollision(pos) == 1) {
            posibles.splice(-1, 1); break;
        } else if (this.calcCollision(pos) == -1) break;
    }
    // abajo
    pos = this.id.split("-").map(Number);
    while (pos[1] < 8) {
        pos[1] += 1;
        posibles.push(pos.slice(0));
        if (this.calcCollision(pos) == 1) {
            posibles.splice(-1, 1); break;
        } else if (this.calcCollision(pos) == -1) break;
    }
    // arriba izquierda
    pos = this.id.split("-").map(Number);
    while (pos[0] > 1 && pos[1] > 1) {
        pos[0] -= 1;
        pos[1] -= 1;
        posibles.push(pos.slice(0));
        if (this.calcCollision(pos) == 1) {
            posibles.splice(-1, 1); break;
        } else if (this.calcCollision(pos) == -1) break;
    }
    // arriba derecha
    pos = this.id.split("-").map(Number);
    while (pos[0] > 1 && pos[1] < 8) {
        pos[0] -= 1;
        pos[1] += 1;
        posibles.push(pos.slice(0));
        if (this.calcCollision(pos) == 1) {
            posibles.splice(-1, 1); break;
        } else if (this.calcCollision(pos) == -1) break;
    }
    // abajo izquierda
    pos = this.id.split("-").map(Number);
    while (pos[0] < 8 && pos[1] > 1) {
        pos[0] += 1;
        pos[1] -= 1;
        posibles.push(pos.slice(0));
        if (this.calcCollision(pos) == 1) {
            posibles.splice(-1, 1); break;
        } else if (this.calcCollision(pos) == -1) break;
    }
    // abajo derecha
    pos = this.id.split("-").map(Number);
    while (pos[0] < 8 && pos[1] < 8) {
        pos[0] += 1;
        pos[1] += 1;
        posibles.push(pos.slice(0));
        if (this.calcCollision(pos) == 1) {
            posibles.splice(-1, 1); break;
        } else if (this.calcCollision(pos) == -1) break;
    }
    //console.log(posibles);
    return posibles;
};
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
        if (this.calcCollision(pos) == 1) posibles.splice(-1, 1);
    }
    pos = this.id.split("-").map(Number);
    if (pos[0] < 8) { // abajo
        pos[0] += 1;
        posibles.push(pos.slice(0));
        if (this.calcCollision(pos) == 1) posibles.splice(-1, 1);
    }
    pos = this.id.split("-").map(Number);
    if (pos[1] > 1) { // izquierda
        pos[1] -= 1;
        posibles.push(pos.slice(0));
        if (this.calcCollision(pos) == 1) posibles.splice(-1, 1);
    }
    pos = this.id.split("-").map(Number);
    if (pos[1] < 8) { // derecha
        pos[1] += 1;
        posibles.push(pos.slice(0));
        if (this.calcCollision(pos) == 1) posibles.splice(-1, 1);
    }
    pos = this.id.split("-").map(Number);
    if (pos[0] > 1 && pos[1] < 8) { // arriba derecha
        pos[0] -= 1;
        pos[1] += 1;
        posibles.push(pos.slice(0));
        if (this.calcCollision(pos) == 1) posibles.splice(-1, 1);
    }
    pos = this.id.split("-").map(Number);
    if (pos[0] < 8 && pos[1] < 8) { // abajo derecha
        pos[0] += 1;
        pos[1] += 1;
        posibles.push(pos.slice(0));
        if (this.calcCollision(pos) == 1) posibles.splice(-1, 1);
    }
    pos = this.id.split("-").map(Number);
    if (pos[0] < 8 && pos[1] > 1) { // abajo izquierda
        pos[0] += 1;
        pos[1] -= 1;
        posibles.push(pos.slice(0));
        if (this.calcCollision(pos) == 1) posibles.splice(-1, 1);
    }
    pos = this.id.split("-").map(Number);
    if (pos[0] > 1 && pos[1] > 1) { // arriba izquierda
        pos[0] -= 1;
        pos[1] -= 1;
        posibles.push(pos.slice(0));
        if (this.calcCollision(pos) == 1) posibles.splice(-1, 1);
    }
    //console.log(posibles);
    return posibles;
};
/******************* */
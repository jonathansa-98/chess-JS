function Pieza(id, img, equipo) {
    this.id = id || "";
    this.img = img || ""; // imagen de la pieza en el tablero.
    this.equipo = equipo || 0; // 0 == blancas && 1 == negras.
}
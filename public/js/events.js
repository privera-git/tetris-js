document.addEventListener('keydown', event => {
    if (event.key == 'ArrowLeft') moveLeft();
    if (event.key == 'ArrowRight') moveRight();
    if (event.key == 'ArrowDown') moveDown();
    if (event.key == 'ArrowUp') rotate();
});

function moveLeft() {
    piece.moveLeft();
}

function moveRight() {
    piece.moveRight();
}

function moveDown() {
    if (!piece.moveDown()) {
        board.add(piece);
        let rowsCompleted = board.removeRows();
        score.addRows(rowsCompleted);
        piece = createRandomPiece(board, initialPosition.x, initialPosition.y);
    }
}

function rotate() {
    piece.rotate();
}
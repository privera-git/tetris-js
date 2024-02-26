document.addEventListener('keydown', event => {
    if (event.key == 'ArrowLeft') moveLeft();
    if (event.key == 'ArrowRight') moveRight();
    if (event.key == 'ArrowDown') moveDown();
    if (event.key == 'ArrowUp') rotate();
});

function moveLeft() {
    if (!game.running) {
        return;
    }

    game.piece.moveLeft();
}

function moveRight() {
    if (!game.running) {
        return;
    }

    game.piece.moveRight();
}

function moveDown() {
    if (!game.running) {
        return;
    }

    if (!game.piece.moveDown()) {
        game.board.add(game.piece);
        let rowsCompleted = game.board.removeRows();
        game.score.addRows(rowsCompleted);
        game.piece = createRandomPiece(game.board, game.initialPosition.x, game.initialPosition.y);
        if (game.piece.checkCollisions()) {
            console.info('Game over!');
            game.stop();
        }
    }
}

function rotate() {
    if (!game.running) {
        return;
    }

    game.piece.rotate();
}
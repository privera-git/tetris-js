class Piece {
    constructor(board, posX, posY, shape, color) {
        this.board = board;
        this.position = {
            x: posX, 
            y: posY
        };
        this.shape = shape;
        this.color = color;        
    }

    draw(context) {          
        this.shape.forEach((row, yOffset) => {
            row.forEach((value, xOffset) => {
                if (value) {
                    context.fillStyle = this.color;
                    context.fillRect(this.position.x + xOffset, this.position.y + yOffset, 1, 1);
                }
            });
        });
    }

    moveLeft() {
        this.position.x--;
        if (this.checkCollisions()) {
            this.position.x++;
        }
    }

    moveRight() {
        this.position.x++;
        if (this.checkCollisions()) {
            this.position.x--;
        }
    }

    moveDown() {
        this.position.y++;
        let canMove = !this.checkCollisions();
        if (!canMove) {
            this.position.y--;
        }
        return canMove;
    }

    checkCollisions() {
        return this.board.checkCollisions(this);
    }

    rotate() {
        return true;
    }
}

function createSquarePiece(board, x, y) {
    let shape = [
        [1, 1],
        [1, 1]
    ];
    return new Piece(board, x, y, shape, 'blue')
}

function createBarPiece(board, x, y) {
    let shape = [
        [1, 1, 1, 1]
    ];
    return new Piece(board, x, y, shape, 'red')
}

function createLPiece(board, x, y) {
    let shape = [
        [1, 0],
        [1, 0],
        [1, 1]
    ];
    return new Piece(board, x, y, shape, 'purple')
}

function createRandomPiece(board, x, y) {
    let shape = Math.floor(Math.random()*3);
    switch (shape) {
        case 0: return createSquarePiece(board, x, y);
        case 1: return createLPiece(board, x, y);
        default: return createBarPiece(board, x, y);
    }
}
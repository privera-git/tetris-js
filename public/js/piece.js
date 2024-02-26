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
        const actual = this.shape;
        const rotated = [];
        
        console.log('actual shape: ');
        console.log(actual);
        for (let y = 0; y < actual[0].length; y++) {
            const row = [];

            for (let x = actual.length-1; x >= 0; x--) {
                let value = actual[x][y];
                console.log('actual[' + x + '][' + y + ']: ');
                console.log(value); 
                row.push(value);
            }

            console.log('row: ');
            console.log(row);
            rotated.push(row);
        }

        this.shape = rotated;
        if (this.checkCollisions()) {
            this.shape = actual;
        }
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

function createInvertedLPiece(board, x, y) {
    let shape = [
        [0, 1],
        [0, 1],
        [1, 1]
    ];
    return new Piece(board, x, y, shape, 'yellow')
}

function createTPiece(board, x, y) {
    let shape = [
        [0, 1, 0],
        [1, 1, 1]
    ];
    return new Piece(board, x, y, shape, 'green')
}

function createZPiece(board, x, y) {
    let shape = [
        [1, 1, 0],
        [0, 1, 1]
    ];
    return new Piece(board, x, y, shape, 'magenta')
}

function createInvertedZPiece(board, x, y) {
    let shape = [
        [0, 1, 1],
        [1, 1, 0]
    ];
    return new Piece(board, x, y, shape, 'orange')
}

function createRandomPiece(board, x, y) {
    let shape = Math.floor(Math.random()*7);
    switch (shape) {
        case 0: return createSquarePiece(board, x, y);
        case 1: return createLPiece(board, x, y);
        case 2: return createInvertedLPiece(board, x, y);
        case 3: return createTPiece(board, x, y);
        case 4: return createZPiece(board, x, y);
        case 5: return createInvertedZPiece(board, x, y);
        default: return createBarPiece(board, x, y);
    }
}
class Board {
    constructor(width, height, backgroundColor, drawColor) {
        this.width = width;
        this.height = height;
        this.backgroundColor = backgroundColor;
        this.drawColor = drawColor;
        this.boardMap = this.createBoardMap();
    }

    add(piece) {
        piece.shape.forEach((row, yOffset) => {
            row.forEach((value, xOffset) => {
                if (!value) {
                    return;
                }

                let posX = piece.position.x + xOffset;
                let posY = piece.position.y + yOffset;
                this.boardMap[posY][posX] = piece.color;
            });
        });
    }

    draw(context) {
        context.fillStyle = this.backgroundColor;
        context.fillRect(0, 0, this.width, this.height);
    
        this.boardMap.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value != 0) {
                    context.fillStyle = value;
                    context.fillRect(x, y, 1, 1);
                }
            });
        });
        
    }

    checkCollisions(piece) {
        return piece.shape.find((row, yOffset) => {
            return row.find((value, xOffset) => {
                
                if (!value) {
                    // transaparent piece block
                    return false;
                }

                let posY = piece.position.y + yOffset;
                if (posY < 0 || posY >= this.height) {
                    // vertical out of bounds
                    console.debug('Collision: vertical out of bounds')
                    return true;
                }

                let posX = piece.position.x + xOffset;
                if (posX < 0 || posX >= this.width) {
                    // horizontal out of bounds
                    console.debug('Collision: horizontal out of bounds')
                    return true;
                }
                
                if (this.boardMap[posY][posX]) {
                    // already a solid block in board
                    console.debug('Collision: already a solid block in board')
                    return true;
                }

                return false;
            });
        });
    }

    removeRows() {

        let rowsToRemove = [];

        this.boardMap.forEach((row, y) => {
            if (this.isRowComplete(row)) {
               rowsToRemove.push(y); 
            }
        });

        rowsToRemove.forEach((y) => {
            this.removeRow(y);
        });
        
        return rowsToRemove.length;
    }

    isRowComplete(row) {
        return row.every(value => value);
    }

    removeRow(y) {
        this.boardMap.splice(y, 1);
        this.boardMap.unshift(Array(this.width).fill(0));
    }
    
    createBoardMap() {
        let map = Array.from({length: this.height}, () => (
            Array(this.width).fill(0))
        );
        console.info(map);
    
        return map;
    }
}
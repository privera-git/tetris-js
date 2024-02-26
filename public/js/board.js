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
                console.log('x,y: ' + posX + ',' + posY);
                console.log(this.boardMap);
                this.boardMap[posY][posX] = 1;
                console.log(this.boardMap);
            });
        });
    }

    draw(context) {
        context.fillStyle = this.backgroundColor;
        context.fillRect(0, 0, this.width, this.height);
    
        this.boardMap.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value != 0) {
                    context.fillStyle = this.drawColor;
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
                    console.log('Collision: vertical out of bounds')
                    return true;
                }

                let posX = piece.position.x + xOffset;
                if (posX < 0 || posX >= this.width) {
                    // horizontal out of bounds
                    console.log('Collision: horizontal out of bounds')
                    return true;
                }
                
                if (this.boardMap[posY][posX]) {
                    // already a solid block in board
                    console.log('Collision: already a solid block in board')
                    return true;
                }

                return false;
            });
        });
    }
    
    createBoardMap() {
        let map = Array.from({length: this.height}, () => (
            Array(this.width).fill(0))
        );
        console.info(map);
    
        map = this.mockData(map);
        console.info(map);
    
        return map;
    }
    
    mockData(map) {
        let firstRow = map[0];
        console.info('first row: '+ firstRow);
    
        let lastRow = map[this.height - 1];
        console.info('last row: '+ lastRow);
    
        let lastBlock = lastRow[this.width - 1];
        console.info('last block: '+ lastBlock);
        
        console.info('setting last block')
        lastRow[this.width - 1] = 1;
        lastRow[this.width - 2] = 1;
        lastRow[this.width - 5] = 1;
    
        console.info('first row: '+ firstRow);
        console.info('last row: '+ lastRow);
    
        return map;
    }
}
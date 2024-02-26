class Game {
    constructor() {
        this.msPerFrame = 1000 / FPS;
        this.frames = 0;
        this.msPrev = window.performance.now();
        this.msMoveDown = 0;
        this.lastMoveDown = 0;
        this.req = null;
        this.initialPosition = { x: BOARD_WIDTH / 2 - 2, y: 0};
        this.running = true;

        this.board = new Board(BOARD_WIDTH, BOARD_HEIGHT, BACKGROUND_COLOR, DRAW_COLOR);
        this.piece = createRandomPiece(this.board, this.initialPosition.x, this.initialPosition.y);
        this.context = this.initContext(BLOCK_SIZE, BOARD_WIDTH, BOARD_HEIGHT);
        this.score = this.initScore();
    }

    initContext(blockSize, boardWidth, boardHeight) {
        console.info('Initializing board');
    
        console.info('Looking for canvas object');
        let $canvas = document.querySelector('canvas');
        if (!$canvas) {
            console.error("Canvas not found");
            return null;
        }
    
        console.info('Setting board size in pixels')
        let width = blockSize * boardWidth;
        let height = blockSize * boardHeight;
        console.info(width + 'x' + height);
    
        $canvas.width = width;
        $canvas.height = height;    
    
        let context = $canvas.getContext('2d');
        console.info('Scaling board: ' + blockSize + 'px');
        context.scale(blockSize, blockSize);
    
        return context;
    }
    
    initScore() {
        let $score = document.getElementById('score');
        return new Score($score);
    }
    
    movePieceDown(time) {
        const deltaMoveDown = time - this.lastMoveDown;
        this.lastMoveDown = time;
    
        this.msMoveDown += deltaMoveDown;
    
        if (this.msMoveDown >= PIECE_FALL_TIME) {
            moveDown();
            this.msMoveDown = 0;
        }
    }
    
    fixFps() {
        const msNow = window.performance.now();
        const msPassed = msNow - this.msPrev;
    
        if (msPassed < this.msPerFrame) {
            return;
        }
    
        const excessTime = msPassed % this.msPerFrame;
        this.msPrev = msNow - excessTime;
    
        this.frames++;
    }
    
    update(time = 0) {
        this.movePieceDown(time);
    
        this.draw();
        this.req = window.requestAnimationFrame(update);
    
        this.fixFps();
    }
    
    stop() {
        this.running = false;
        window.cancelAnimationFrame(this.req);
    }
    
    draw() {
        this.board.draw(this.context);
        this.piece.draw(this.context);
        this.score.draw();
    }
}

function update(time) {
    game.update(time);
}

let game = new Game();  
game.update();

setInterval(() => {
    console.log(game.frames)
}, 1000);


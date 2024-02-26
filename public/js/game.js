const BLOCK_SIZE = 30;
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

const BACKGROUND_COLOR = '#000';
const DRAW_COLOR = "#ccc";

const PIECE_FALL_TIME = 1000;

let board = new Board(BOARD_WIDTH, BOARD_HEIGHT, BACKGROUND_COLOR, DRAW_COLOR);

let initialPosition = { x: BOARD_WIDTH / 2 - 2, y: 0};
let piece = createRandomPiece(board, initialPosition.x, initialPosition.y);

let context = initContext(BLOCK_SIZE, BOARD_WIDTH, BOARD_HEIGHT);
let score = initScore();

const FPS = 30;
const MS_PER_FRAME = 1000 / FPS;
let frames = 0;
let msPrev = window.performance.now();

let msMoveDown = 0;
let lastMoveDown = 0;

update();

setInterval(() => {
    console.log(frames)
}, 1000);

function initContext(blockSize, boardWidth, boardHeight) {
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

function initScore() {
    let $score = document.getElementById('score');
    return new Score($score);
}

function movePieceDown(time) {
    const deltaMoveDown = time - lastMoveDown;
    lastMoveDown = time;

    msMoveDown += deltaMoveDown;

    if (msMoveDown >= PIECE_FALL_TIME) {
        moveDown();
        msMoveDown = 0;
    }
}

function fixFps() {
    const msNow = window.performance.now();
    const msPassed = msNow - msPrev;

    if (msPassed < MS_PER_FRAME) {
        return;
    }

    const excessTime = msPassed % MS_PER_FRAME;
    msPrev = msNow - excessTime;

    frames++;
}

function update(time = 0) {
    movePieceDown(time);

    draw();
    window.requestAnimationFrame(update);

    fixFps();
}

function draw() {
    board.draw(context);
    piece.draw(context);
    score.draw();
}
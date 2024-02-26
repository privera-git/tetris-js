const BLOCK_SIZE = 30;
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

const BACKGROUND_COLOR = '#000';
const DRAW_COLOR = "yellow";

let board = new Board(BOARD_WIDTH, BOARD_HEIGHT, BACKGROUND_COLOR, DRAW_COLOR);

let initialPosition = { x: BOARD_WIDTH / 2 - 2, y: 0};
let piece = createRandomPiece(board, initialPosition.x, initialPosition.y);

let context = initContext(BLOCK_SIZE, BOARD_WIDTH, BOARD_HEIGHT);

const FPS = 30;
const MS_PER_FRAME = 1000 / FPS;
let frames = 0;
let msPrev = window.performance.now();

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

function update() {
    draw();
    window.requestAnimationFrame(update);

    const msNow = window.performance.now();
    const msPassed = msNow - msPrev;

    if (msPassed < MS_PER_FRAME) {
        return;
    }

    const excessTime = msPassed % MS_PER_FRAME;
    msPrev = msNow - excessTime;

    frames++;
}

function draw() {
    board.draw(context);
    piece.draw(context);
}
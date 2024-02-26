const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

const BACKGROUND_COLOR = '#000';
const DRAW_COLOR = "yellow";

function initBoard() {
    console.info('Initializing board');

    console.info('Looking for canvas object');
    let $canvas = document.querySelector('canvas');
    if (!$canvas) {
        console.error("Canvas not found");
        return null;
    }

    console.info('Setting board size in pixels')
    let width = BLOCK_SIZE * BOARD_WIDTH;
    let height = BLOCK_SIZE * BOARD_HEIGHT;
    console.info(width + 'x' + height);

    $canvas.width = width;
    $canvas.height = height;    

    let context = $canvas.getContext('2d');
    console.info('Scaling board: ' + BLOCK_SIZE + 'px');
    context.scale(BLOCK_SIZE, BLOCK_SIZE);

    return context;
}

function draw() {
    board.fillStyle = BACKGROUND_COLOR;
    board.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);

    boardMap.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value != 0) {
                board.fillStyle = DRAW_COLOR;
                board.fillRect(x, y, 1, 1);
            }
        });
    });
    
}

function createBoardMap() {
    let map = Array.from({length: BOARD_HEIGHT}, () => (
        Array(BOARD_WIDTH).fill(0))
    );
    console.info(map);

    map = mockData(map);
    console.info(map);

    return map;
}

function mockData(map) {
    let firstRow = map[0];
    console.info('first row: '+ firstRow);

    let lastRow = map[BOARD_HEIGHT - 1];
    console.info('last row: '+ lastRow);

    let lastBlock = lastRow[BOARD_WIDTH - 1];
    console.info('last block: '+ lastBlock);
    
    console.info('setting last block')
    lastRow[BOARD_WIDTH - 1] = 1;
    lastRow[BOARD_WIDTH - 2] = 1;
    lastRow[BOARD_WIDTH - 5] = 1;

    console.info('first row: '+ firstRow);
    console.info('last row: '+ lastRow);

    return map;
}
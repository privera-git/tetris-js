const BLOCK_SIZE = 30;

const FPS = 30
const MS_PER_FRAME = 1000 / FPS

let board = initBoard();
let boardMap = createBoardMap();

let frames = 0
let msPrev = window.performance.now()
update();

setInterval(() => {
    console.log(frames)
}, 1000);


function update() {
    draw();
    window.requestAnimationFrame(update);

    const msNow = window.performance.now()
    const msPassed = msNow - msPrev

    if (msPassed < MS_PER_FRAME) return

    const excessTime = msPassed % MS_PER_FRAME
    msPrev = msNow - excessTime

    frames++
}
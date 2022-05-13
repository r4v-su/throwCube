"use strict";

const CONTAINER = document.createElement('div');

CONTAINER.setAttribute('id', 'CONTAINER');
document.body.appendChild(CONTAINER);

const debug = true,
    log = function (arg) {if (debug) {console.log(arg)}},

    CANVAS_STYLING = {
        bgcol: 'black',
        dotcol: 'black',
        edgecol: 'red'
    },

    CANVAS_MEASUREMENTS = {
        width: 600, //set ANY
        height: 600, //set ANY
        scale: 1,
        dotSize: 5,
        startAngle: 0,
        endAngle: 2 * Math.PI
    },

    CANVAS_POINT_ZERO = {
        x: CANVAS_MEASUREMENTS.width * 0.5,
        y: CANVAS_MEASUREMENTS.height * 0.5
    };

log(CANVAS_POINT_ZERO);

log(`CANVAS_MEASUREMENTS : ${Object.entries(CANVAS_MEASUREMENTS)}`);
log(`CANVAS_POINT_ZERO :  ${Object.entries(CANVAS_POINT_ZERO)}`);

const CTX = document.createElement('canvas').getContext('2d');
CTX.canvas.width = CANVAS_MEASUREMENTS.width;
CTX.canvas.height = CANVAS_MEASUREMENTS.height;
CONTAINER.appendChild(CTX.canvas);
CTX.canvas.setAttribute('id', 'cube');

const PLAY_BUTTON = document.createElement('button');
PLAY_BUTTON.innerHTML = 'play';
PLAY_BUTTON.setAttribute('id', 'PLAY_BUTTON');
PLAY_BUTTON.style.position = 'absolute';
PLAY_BUTTON.style.left = `${CANVAS_POINT_ZERO.x + CANVAS_MEASUREMENTS.dotSize}px`;
PLAY_BUTTON.style.transform = 'translateX(-50%)';
PLAY_BUTTON.style.top = `${(2 * CANVAS_POINT_ZERO.y)}px`;
CONTAINER.appendChild(PLAY_BUTTON);

const PROGRESS_BAR = document.createElement('progress');
PROGRESS_BAR.setAttribute('type', 'range');
PROGRESS_BAR.setAttribute('max', '200');
PROGRESS_BAR.setAttribute('value', '0');
PROGRESS_BAR.setAttribute('id', 'throwBar');
PROGRESS_BAR.style.position = 'absolute';
PROGRESS_BAR.style.width = '50px';
PROGRESS_BAR.style.top = `${(1.7*CANVAS_POINT_ZERO.y)}px`;
PROGRESS_BAR.style.left = `${CANVAS_POINT_ZERO.x + CANVAS_MEASUREMENTS.dotSize}px`;
PROGRESS_BAR.style.transform = `translateX(-50%)`;
CONTAINER.appendChild(PROGRESS_BAR);

const CUBE_WALLS = {
    1: [
        [CANVAS_POINT_ZERO.x, CANVAS_POINT_ZERO.y, CANVAS_MEASUREMENTS.dotSize, CANVAS_MEASUREMENTS.startAngle, CANVAS_MEASUREMENTS.endAngle, true]
    ],
    2: [
        [CANVAS_POINT_ZERO.x - 2 * CANVAS_MEASUREMENTS.dotSize, CANVAS_POINT_ZERO.y, CANVAS_MEASUREMENTS.dotSize, CANVAS_MEASUREMENTS.startAngle, CANVAS_MEASUREMENTS.endAngle, true],
        [CANVAS_POINT_ZERO.x + 2 * CANVAS_MEASUREMENTS.dotSize, CANVAS_POINT_ZERO.y, CANVAS_MEASUREMENTS.dotSize, CANVAS_MEASUREMENTS.startAngle, CANVAS_MEASUREMENTS.endAngle, true]
    ],

    3: [
        [CANVAS_POINT_ZERO.x - 2 * CANVAS_MEASUREMENTS.dotSize, CANVAS_POINT_ZERO.y - 2 * CANVAS_MEASUREMENTS.dotSize, CANVAS_MEASUREMENTS.dotSize, CANVAS_MEASUREMENTS.startAngle, CANVAS_MEASUREMENTS.endAngle, true], //topleft
        [CANVAS_POINT_ZERO.x + 2 * CANVAS_MEASUREMENTS.dotSize, CANVAS_POINT_ZERO.y + 2 * CANVAS_MEASUREMENTS.dotSize, CANVAS_MEASUREMENTS.dotSize, CANVAS_MEASUREMENTS.startAngle, CANVAS_MEASUREMENTS.endAngle, true], // bottomright
        [CANVAS_POINT_ZERO.x, CANVAS_POINT_ZERO.y, CANVAS_MEASUREMENTS.dotSize, CANVAS_MEASUREMENTS.startAngle, CANVAS_MEASUREMENTS.endAngle, true], //center
    ],
    4: [
        [CANVAS_POINT_ZERO.x - 2 * CANVAS_MEASUREMENTS.dotSize, CANVAS_POINT_ZERO.y - 2 * CANVAS_MEASUREMENTS.dotSize, CANVAS_MEASUREMENTS.dotSize, CANVAS_MEASUREMENTS.startAngle, CANVAS_MEASUREMENTS.endAngle, true], //topleft
        [CANVAS_POINT_ZERO.x + 2 * CANVAS_MEASUREMENTS.dotSize, CANVAS_POINT_ZERO.y - 2 * CANVAS_MEASUREMENTS.dotSize, CANVAS_MEASUREMENTS.dotSize, CANVAS_MEASUREMENTS.startAngle, CANVAS_MEASUREMENTS.endAngle, true], //topright
        [CANVAS_POINT_ZERO.x - 2 * CANVAS_MEASUREMENTS.dotSize, CANVAS_POINT_ZERO.y + 2 * CANVAS_MEASUREMENTS.dotSize, CANVAS_MEASUREMENTS.dotSize, CANVAS_MEASUREMENTS.startAngle, CANVAS_MEASUREMENTS.endAngle, true], //bottomleft
        [CANVAS_POINT_ZERO.x + 2 * CANVAS_MEASUREMENTS.dotSize, CANVAS_POINT_ZERO.y + 2 * CANVAS_MEASUREMENTS.dotSize, CANVAS_MEASUREMENTS.dotSize, CANVAS_MEASUREMENTS.startAngle, CANVAS_MEASUREMENTS.endAngle, true] // bottomright
    ],
    5: [
        [CANVAS_POINT_ZERO.x - 2 * CANVAS_MEASUREMENTS.dotSize, CANVAS_POINT_ZERO.y - 2 * CANVAS_MEASUREMENTS.dotSize, CANVAS_MEASUREMENTS.dotSize, CANVAS_MEASUREMENTS.startAngle, CANVAS_MEASUREMENTS.endAngle, true], //topleft
        [CANVAS_POINT_ZERO.x + 2 * CANVAS_MEASUREMENTS.dotSize, CANVAS_POINT_ZERO.y - 2 * CANVAS_MEASUREMENTS.dotSize, CANVAS_MEASUREMENTS.dotSize, CANVAS_MEASUREMENTS.startAngle, CANVAS_MEASUREMENTS.endAngle, true], //topright
        [CANVAS_POINT_ZERO.x - 2 * CANVAS_MEASUREMENTS.dotSize, CANVAS_POINT_ZERO.y + 2 * CANVAS_MEASUREMENTS.dotSize, CANVAS_MEASUREMENTS.dotSize, CANVAS_MEASUREMENTS.startAngle, CANVAS_MEASUREMENTS.endAngle, true], //bottomleft
        [CANVAS_POINT_ZERO.x + 2 * CANVAS_MEASUREMENTS.dotSize, CANVAS_POINT_ZERO.y + 2 * CANVAS_MEASUREMENTS.dotSize, CANVAS_MEASUREMENTS.dotSize, CANVAS_MEASUREMENTS.startAngle, CANVAS_MEASUREMENTS.endAngle, true], // bottomright
        [CANVAS_POINT_ZERO.x, CANVAS_POINT_ZERO.y, CANVAS_MEASUREMENTS.dotSize, CANVAS_MEASUREMENTS.startAngle, CANVAS_MEASUREMENTS.endAngle, true] //center
    ],
    6: [
        [CANVAS_POINT_ZERO.x - 2 * CANVAS_MEASUREMENTS.dotSize, CANVAS_POINT_ZERO.y - 3 * CANVAS_MEASUREMENTS.dotSize, CANVAS_MEASUREMENTS.dotSize, CANVAS_MEASUREMENTS.startAngle, CANVAS_MEASUREMENTS.endAngle, true], //topleft
        [CANVAS_POINT_ZERO.x + 2 * CANVAS_MEASUREMENTS.dotSize, CANVAS_POINT_ZERO.y - 3 * CANVAS_MEASUREMENTS.dotSize, CANVAS_MEASUREMENTS.dotSize, CANVAS_MEASUREMENTS.startAngle, CANVAS_MEASUREMENTS.endAngle, true], //topright
        [CANVAS_POINT_ZERO.x - 2 * CANVAS_MEASUREMENTS.dotSize, CANVAS_POINT_ZERO.y + 3 * CANVAS_MEASUREMENTS.dotSize, CANVAS_MEASUREMENTS.dotSize, CANVAS_MEASUREMENTS.startAngle, CANVAS_MEASUREMENTS.endAngle, true], //bottomleft
        [CANVAS_POINT_ZERO.x + 2 * CANVAS_MEASUREMENTS.dotSize, CANVAS_POINT_ZERO.y + 3 * CANVAS_MEASUREMENTS.dotSize, CANVAS_MEASUREMENTS.dotSize, CANVAS_MEASUREMENTS.startAngle, CANVAS_MEASUREMENTS.endAngle, true], // bogttomright
        [CANVAS_POINT_ZERO.x + 2 * CANVAS_MEASUREMENTS.dotSize, CANVAS_POINT_ZERO.y, CANVAS_MEASUREMENTS.dotSize, CANVAS_MEASUREMENTS.startAngle, CANVAS_MEASUREMENTS.endAngle, true], // centerright
        [CANVAS_POINT_ZERO.x - 2 * CANVAS_MEASUREMENTS.dotSize, CANVAS_POINT_ZERO.y, CANVAS_MEASUREMENTS.dotSize, CANVAS_MEASUREMENTS.startAngle, CANVAS_MEASUREMENTS.endAngle, true] // centerright
    ]
};
const drawEdge = function () {
    CTX.fillStyle = CANVAS_STYLING.edgecol;
    CTX.strokeRect(CANVAS_POINT_ZERO.x - (CANVAS_MEASUREMENTS.dotSize * 5), CANVAS_POINT_ZERO.y - (CANVAS_MEASUREMENTS.dotSize * 5), CANVAS_MEASUREMENTS.dotSize * 10, CANVAS_MEASUREMENTS.dotSize * 10)
};
const drawWall = function (wall) {
    CUBE_WALLS[wall].forEach(dot => {
        CTX.beginPath();
        CTX.arc(...dot);
        CTX.fillStyle = CANVAS_STYLING.dotcol;
        CTX.fill();
    })
};
const clearWall = function () {
    CTX.clearRect(CANVAS_POINT_ZERO.x - (CANVAS_MEASUREMENTS.dotSize * 4), CANVAS_POINT_ZERO.y - (CANVAS_MEASUREMENTS.dotSize * 4), CANVAS_MEASUREMENTS.dotSize * 8, CANVAS_MEASUREMENTS.dotSize * 8)
};

let frameID = 0,
    turns = 0,
    result = [];

const max = Object.keys(CUBE_WALLS).length,
pickRandomNumber = function (max) {
    let a = Math.floor(Math.random()) * max + Math.ceil(Math.random() * max);
    return a;
};

const throwCube = function () {

    ++frameID;
    PROGRESS_BAR.value = frameID;
    PLAY_BUTTON.disabled = true

    if (frameID == 200) {
        PLAY_BUTTON.disabled = false;
        document.getElementById('throwBar').value = frameID;
        log(result);
    } else
    if (frameID < 200) {
        drawEdge();
        window.requestAnimationFrame(throwCube);
        if (frameID % 25 == 0) {
            result = (pickRandomNumber(max));
            clearWall();
            drawWall(result);
        }
    }
};
const newGame = function () {
    result = [];
    frameID = 0;
    clearWall();
    throwCube();
}
PLAY_BUTTON.addEventListener('click', newGame);
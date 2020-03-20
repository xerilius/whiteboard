"use strict";
// Canvas Dimensions
let canvas = document.querySelector('#whiteboard');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let touchX, touchY;
let [clickX, clickY] = [0,0];

let isDrawing = false;


// function drawDot(ctx, x, y, size) {
    // Select a fill style
    // ctx.fillStyle = "black";

    // // Draw a filled circle
    // ctx.beginPath();
    // ctx.arc(x, y, size, 0, Math.PI*2, true); 
    // ctx.closePath();
    // ctx.fill();
// }

function drawLine(e) {
    ctx.strokeStyle = 'black'; // stroke color
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.lineWidth = 20;
    ctx.shadowBlur = 5;
    ctx.shadowColor = 'black';
    ctx.fill('evenodd');
   

    ctx.closePath();
   

    // start
    ctx.beginPath();
  
    // go to
    getTouchPos();
    ctx.lineTo(touchX, touchY);

    ctx.stroke(); // shows the stroke
}

function draw(e) {

    ctx.strokeStyle = 'black'; // stroke color
    ctx.lineJoin = 'miter'; // when line meets another line should it be squared off or round ?
    ctx.lineCap = 'round';
    ctx.lineWidth = 50;

    if (!isDrawing) return;

    
    ctx.beginPath();

    // start from
    ctx.moveTo(clickX, clickY);
    // go to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    // update coordinates
    [clickX, clickY] = [e.offsetX, e.offsetY] // destructuring an array
}


// Draw when touchstart is detected
function onTouchStart() {
    console.log("onTouchStart");
    // update touch coordinates
    getTouchPos();
    // draw dot at new coordinates
    // drawDot(ctx, touchX, touchY, 50);
    drawLine();

    // Prevents an additional mousedown event being triggered
    event.preventDefault();
}

// Draw and prevent default scrolling when touch movement is detected
function onTouchMove(e) {
    getTouchPos(e);
    console.log("onTouchMove");

    // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen 
    // drawDot(ctx, touchX, touchY, 50);
    drawLine();
    
    // Prevent a scrolling action as a result of this touchmove triggering.
    event.preventDefault();
}

function getTouchPos(e) {
    if (!e) return;

    if(e.touches) {
        if (e.touches.length == 1) { // Only deal with one finger
            var touch = e.touches[0]; // Get the information for finger #1
            touchX=touch.pageX-touch.target.offsetLeft;
            touchY=touch.pageY-touch.target.offsetTop;
        }
    }
}

// 3 MOUSE EVENTS
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [clickX, clickY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', (e) => {
    isDrawing = false;
});
canvas.addEventListener('mouseout', () => isDrawing = false); 


// 2 TOUCH EVENTS
canvas.addEventListener('touchstart', onTouchStart, false);
canvas.addEventListener('touchmove', onTouchMove, false);

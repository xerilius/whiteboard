"use strict";
// Canvas Dimensions
let canvas = document.querySelector('#whiteboard');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let touchX, touchY;

function drawDot(ctx, x, y, size) {
    // Select a fill style
    ctx.fillStyle = "black";

    // Draw a filled circle
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI*2, true); 
    ctx.closePath();
    ctx.fill();
}
// Draw when touchstart is detected
function onTouchStart() {
    console.log("onTouchStart");
    // update touch coordinates
    getTouchPos();
    // draw dot at new coordinates
    drawDot(ctx, touchX, touchY, 50);

    // Prevents an additional mousedown event being triggered
    event.preventDefault();
}
// Draw and prevent default scrolling when touch movement is detected
function onTouchMove(e) {
    getTouchPos(e);
    console.log("onTouchMove");

    // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen 
    drawDot(ctx, touchX, touchY, 50);
    
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


canvas.addEventListener('touchstart', onTouchStart, false);
canvas.addEventListener('touchmove', onTouchMove, false);

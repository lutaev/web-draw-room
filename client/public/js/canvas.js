
'use strict';

let context, canvas;

export function init(data) {
    context = data.context;
    canvas = data.canvas;
}

export function start(x, y) {
    context.beginPath();
    context.moveTo(x, y);
}

export function draw(x, y, color) {
    context.lineTo(x, y);
    context.strokeStyle = color;
    context.stroke();
}

export function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}
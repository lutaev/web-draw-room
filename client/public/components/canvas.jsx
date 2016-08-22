
'use strict';
import React from 'react';

export default React.createClass({
  started: false,

  action(event) {
    let x = event.pageX - this.canvas.offsetLeft;
    let y = event.pageY - this.canvas.offsetTop;

    //debugger;
    this[event.type](x, y);
  },

  mousedown(x, y) {
    console.log(x + '  ' + y)
    this.context.beginPath();
    this.context.moveTo(x, y);
    this.started = true;
  },

  mousemove(x, y) {
    if (this.started) {
      this.context.lineTo(x, y);
      this.context.stroke();
    }
  },

  mouseup(x, y) {
    //this.mousemove(x, y);
    this.started = false;
  },

  componentDidMount() {
    this.canvas = this.refs.canvas;
    this.context = this.canvas.getContext('2d');
  },

  render() {
    return <canvas ref="canvas" id="canvas" onMouseMove={this.action} onMouseUp={this.action} onMouseDown={this.action}
                   width="500" height="500"></canvas>
  }
})

'use strict';
import React from 'react';
import Dispatcher from '../js/dispatcher';

export default React.createClass({
  started: false,

  action(event) {
    const box = this.canvas.getBoundingClientRect();

    let x = event.pageX - box.left;
    let y = event.pageY - box.top;

    this[event.type](x, y);
  },

  mousedown(x, y) {
    this.context.beginPath();
    this.context.moveTo(x, y);
    this.started = true;
  },

  mousemove(x, y) {
    if (this.started) {
      this.context.lineTo(x, y);
      this.context.strokeStyle = this.props.color;
      this.context.stroke();

      Dispatcher.dispatch({
        eventName: 'draw',
        data: {
          line: [x, y],
          color: this.props.color
        }
      });
    }
  },

  mouseup(x, y) {
    this.started = false;
  },

  mouseleave() {
    this.started = false;
  },

  componentDidMount() {
    this.canvas = this.refs.canvas;
    this.context = this.canvas.getContext('2d');
  },

  render() {
    return <canvas ref="canvas" id="canvas" onMouseMove={this.action} onMouseUp={this.action} onMouseDown={this.action} onMouseLeave={this.action}
                   width="500" height="500"></canvas>
  }
})
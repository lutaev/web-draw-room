
'use strict';
import React from 'react';
import store from '../js/store';
import * as canvasCore from '../js/canvas';
import {drawStart, draw, drawStop} from '../js/core';

export default React.createClass({
  started: false,

  componentDidMount() {
    this.canvas = this.refs.canvas;
    this.context = this.canvas.getContext('2d');

    store.dispatch({
      type: 'INIT_CANVAS',
      data: {
        canvas: this.canvas,
        context: this.context
      }
    })
  },

  action(event) {
    const box = this.canvas.getBoundingClientRect();

    let x = event.pageX - box.left;
    let y = event.pageY - box.top;

    this[event.type](x, y);
  },

  mousedown(x, y) {
    canvasCore.start(x, y);
    this.started = true;

    drawStart({
      point: [x, y]
    });
  },

  mousemove(x, y) {
    if (this.started) {
      canvasCore.draw(x, y, this.props.color);

      draw({
        line: [x, y],
        color: this.props.color
      });
    }
  },

  mouseup() {
    drawStop();
    this.started = false;
  },

  mouseleave() {
    drawStop();
    this.started = false;
  },

  render() {
    return <canvas ref="canvas" id="canvas" onMouseMove={this.action} onMouseUp={this.action} onMouseDown={this.action} onMouseLeave={this.action}
                   width="500" height="500"></canvas>
  }
})
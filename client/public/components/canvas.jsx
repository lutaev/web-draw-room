
'use strict';
import React from 'react';
import Dispatcher from '../js/dispatcher';
import store from '../js/store';

export default React.createClass({
  started: false,
  serverStarted: false,

  componentDidMount() {
    this.canvas = this.refs.canvas;
    this.context = this.canvas.getContext('2d');

    store.on('draw-start', this.drawStart);
    store.on('draw', this.draw);
    store.on('draw-stop', this.drawStop);
    store.on('clear-board', this.clearBoard);
  },

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

    Dispatcher.dispatch({
      eventName: 'draw-start',
      data: {
        point: [x, y]
      }
    });
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

  mouseup() {
    Dispatcher.dispatch({
      eventName: 'draw-stop'
    });
    this.started = false;
  },

  mouseleave() {
    Dispatcher.dispatch({
      eventName: 'draw-stop'
    });
    this.started = false;
  },

  drawStart(data) {
    this.context.beginPath();
    this.context.moveTo(data.point[0], data.point[1]);
    this.serverStarted = true;
  },

  draw(data) {
    this.context.lineTo(data.line[0], data.line[1]);
    this.context.strokeStyle = data.color;
    this.context.stroke();
  },

  drawStop() {
    this.serverStarted = false;
  },

  clearBoard() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  componentWillUnmount() {
    store.off('draw-start');
    store.off('draw');
    store.off('draw-stop');
    store.off('clear-board');
  },

  render() {
    return <canvas ref="canvas" id="canvas" onMouseMove={this.action} onMouseUp={this.action} onMouseDown={this.action} onMouseLeave={this.action}
                   width="500" height="500"></canvas>
  }
})
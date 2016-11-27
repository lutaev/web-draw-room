
'use strict';

import {Map} from 'immutable';
import Socket from './socket';
import * as canvasCore from './canvas';

let socket;

export const COLORS = [
  '#000', '#adadad', '#ff0000', '#5800ff', '#00ffde', '#25ff00',
  '#edff00', '#ff00f5', '#009fff', '#00ff97', '#ffa700'
];

export const INITIAL_STATE = Map({
  color: COLORS[0],
  code: ''
});

export function codeAdded(state, data) {
  // Connecting to websocket
  socket = Socket.connect(data.code);

  data.waiting = !data.partner;
  return state.merge(data);
}

export function partnerAdded(state) {
  return state.merge({
    partner: true,
    waiting: false
  });
}

export function partnerLost(state) {
  return state.merge({
    partner: false
  })
}

export function logout(state) {
  socket.emit('logout');
  return state.merge({
    partner: false,
    color: COLORS[0],
    code: '',
    waiting: false
  })
}

export function initCanvas(state, data) {
  canvasCore.init(data);
  return state;
}

export function drawStart(data) {
  socket.emit('draw-start', data);
}

export function draw(data) {
  socket.emit('draw', data);
}

export function drawStop() {
  socket.emit('draw-stop');
}

export function clearBoard(){
  socket.emit('clear-board');
}


// From server

export function serverDrawStart(data){
  canvasCore.start(data.point[0], data.point[1]);
}

export function serverDraw(data){
  console.log(data.color);
  canvasCore.draw(data.line[0], data.line[1], data.color);
}

export function serverDrawStop(){}

export function serverClearBoard(){
  canvasCore.clear();
}

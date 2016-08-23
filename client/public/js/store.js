
'use strict';

import $ from 'jquery';
import Events from 'minivents';
import socket from './socket';

const store =  {
  code: null,
  color: null,
  id: null,
  partner: false,

  // Events from UI

  checkCode(data){
    $.ajax({
      type: 'POST',
      url: '/api/add-code',
      data: data,
      success: this.onCodeChecked.bind(this),
      error: error => {
        console.log(error);
      }
    });
  },

  onCodeChecked(response) {
    if (response.status == 200) {

      this.id = response.person.id;
      this.code = response.person.code;
      this.color = response.person.color;

      this.partner = response.person.hasPartner;

      // Connecting to websocket
      this.socket = socket.connect(this.code);

      // Triggering events
      this.emit('code-added');
    } else {
      alert(response.message);
    }
  },

  drawStart(data) {
    this.socket.emit('draw-start', data);
  },

  draw(data) {
    this.socket.emit('draw', data);
  },

  drawStop() {
    this.socket.emit('draw-stop');
  },

  clearBoard(){
    this.socket.emit('clear-board');
  },


  // Events from server

  serverDrawStart(data){
    this.emit('draw-start', data);
  },

  serverDraw(data){
    this.emit('draw', data);
  },

  serverDrawStop(data){
    this.emit('draw-stop', data);
  },

  serverClearBoard(){
    this.emit('clear-board');
  },

  refreshAll() {
    this.code = null;
    this.color = null;
    this.id = null;
    this.partner = false;

    this.emit('store-refresh');
  },

  partnerAdded() {
    this.emit('partner-added');
  }
};

// Add events to our store
Events(store);


export default store;
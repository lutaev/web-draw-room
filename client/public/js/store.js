
'use strict';

import $ from 'jquery';
import Events from 'minivents';
import socket from './socket';

const store =  {
  code: null,
  color: null,
  id: null,
  partner: false,

  refreshAll() {
    this.code = null;
    this.color = null;
    this.id = null;
    this.partner = false;

    this.emit('store-refresh');
  },

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
      this.socket = socket(this.code);

      // Triggering events
      this.emit('code-added');
    } else {
      alert(response.message);
    }
  },

  partnerAdded() {
    this.emit('partner-added');
  },

  draw(data) {
    this.socket.emit('draw', data);
  },

  serverDraw(data){
    console.log(data);
  }
};

// Add events to our store
Events(store);


export default store;
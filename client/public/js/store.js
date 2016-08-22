
'use strict';

import $ from 'jquery';
import Events from 'minivents';
import socket from './socket';

const store =  {
  code: null,
  id: null,
  socket: null,

  checkCode(data){
    $.ajax({
      type: 'POST',
      url: '/api/add-code',
      data: data,
      success: response => {
        if (response.status == 200) {
          this.id = response.id;
          this.code = response.code;

          // Connecting to websocket
          socket(this.code);

          // Triggering event
          this.emit('code-added');
        } else {
          alert(response.message);
        }
      },
      error: error => {
        console.log(error);
      }
    });
  },

  partnerAdded() {
    this.emit('partnerAdded');
  },

  serverDraw(){

  }
};

// Add events to our store
Events(store);


export default store;
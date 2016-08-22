
'use strict';

import React from 'react';
import Canvas from './canvas';
import store from '../js/store';

export default React.createClass({
  getInitialState() {
    return {
      partner: true
    }
  },

  componentDidMount() {
    store.on('has-partner', this.onPartnerAdded);
  },

  onPartnerAdded() {
    this.setState({
      partner: true
    });
  },

  render() {
    const content = this.state.partner ? <Canvas/> : <p>Waiting for partner...</p>;
    return (
      <div id="canvas-wrapper">
        <h4>Here is our canvas</h4>
        {content}
      </div>
    )
  }
});

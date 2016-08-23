
'use strict';

import React from 'react';
import Canvas from './canvas';
import store from '../js/store';

export default React.createClass({
  getInitialState() {
    return {
      partner: false
    }
  },

  componentWillMount() {
    this.setState({
      partner: store.partner
    });
  },

  componentDidMount() {
    if (!this.state.partner) {
      store.on('partner-added', this.onPartnerAdded);
    }
  },

  onPartnerAdded() {
    this.setState({
      partner: true
    });
  },

  render() {
    const content = this.state.partner ? <Canvas color={store.color}/> : <p>Waiting for partner...</p>;
    const button = this.state.partner ? <button className="btn btn-lg btn-primary">Clear the board</button> : '';
    const className = this.state.partner ? 'col-xs-9' : 'col-xs-12';

    return (
      <div id="canvas-wrapper">
        <div className="row">
          <div className="col-xs-3">
            {button}
          </div>
          <div className={className}>{content}</div>
        </div>
      </div>
    )
  }
});

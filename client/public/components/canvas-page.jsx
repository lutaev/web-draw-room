
'use strict';

import React from 'react';
import Canvas from './canvas';
import store from '../js/store';
import Dispatcher from '../js/dispatcher';

export default React.createClass({
  getInitialState() {
    return {
      partner: false
    }
  },

  componentDidMount() {
    if (!store.partner) {
      store.on('partner-added', this.onPartnerAdded);
    } else {
      this.setState({
        partner: store.partner
      });
    }
  },

  onPartnerAdded() {
    this.setState({
      partner: true
    });
  },

  clearBoard() {
    Dispatcher.dispatch({
      eventName: 'clear-board'
    });
  },

  componentWillUnmount() {
    store.off('partner-added', this.onPartnerAdded);
  },

  render() {
    const content = this.state.partner ? <Canvas color={store.color}/> : <p>Waiting for partner...</p>;
    const button = this.state.partner ? <button className="btn btn-lg btn-primary" onClick={this.clearBoard}>Clear the board</button> : '';
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

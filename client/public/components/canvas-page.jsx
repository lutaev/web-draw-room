
'use strict';

import React from 'react';
import Canvas from './canvas';
import {clearBoard} from '../js/core';

export default React.createClass({
  render() {
    const content = this.props.partner ? <Canvas color={this.props.color}/> : <p>Waiting for partner...</p>;
    const button = this.props.partner ? <button className="btn btn-lg btn-primary" onClick={clearBoard}>Clear the board</button> : '';
    const className = this.props.partner ? 'col-xs-9' : 'col-xs-12';

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

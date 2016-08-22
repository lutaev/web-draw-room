
'use strict';

import React from 'react';
import Dispatcher from '../js/dispatcher';

export default React.createClass({
    onInput(event) {
        this.code = event.target.value;
    },

    onSubmit(event) {
        event.preventDefault();

        if (this.code) {
          Dispatcher.dispatch({
              eventName: 'add-code',
              data: { code: this.code }
          });
        }
    },

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="enterCode">Code</label>
                    <input onInput={this.onInput} type="text" className="form-control" id="enterCode" placeholder="Enter your code"/>
                </div>
                <div className="text-right">
                    <button type="submit" className="btn btn-default">Submit</button>
                </div>
            </form>
        )
    }
});


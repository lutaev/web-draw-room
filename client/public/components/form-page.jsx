
'use strict';

import React from 'react';
import Dispatcher from '../js/dispatcher';

export default React.createClass({

    colors: [
        '#000', '#adadad', '#ff0000', '#5800ff', '#00ffde', '#25ff00',
        '#edff00', '#ff00f5', '#009fff', '#00ff97', '#ffa700'
    ],

    getInitialState() {
        return {
            color: '#000',
            code: ''
        }
    },

    onInput(event) {
        this.setState({code: event.target.value.trim()});
    },

    selectColor: function(event){
        this.setState({color: event.target.value});
    },

    onSubmit(event) {
        event.preventDefault();

        if (this.state.code) {
          Dispatcher.dispatch({
              eventName: 'add-code',
              data: {
                  code: this.state.code,
                  color: this.state.color
              }
          });
        }
    },

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="enterCode">Code</label>
                    <input onInput={this.onInput} value={this.state.code} type="text" className="form-control" id="enterCode" placeholder="Enter your code" required/>
                </div>
                <div className="form-group">
                    <label>Select color</label>
                    <select className="form-control" onChange={this.selectColor}  value={this.state.color} style={{color: this.state.color}}>
                        {this.colors.map((color, key) => {
                            return <option key={key} value={color} style={{color: color}}>{color}</option>
                        })}
                    </select>
                </div>
                <div className="text-right">
                    <button type="submit" className="btn btn-default">Submit</button>
                </div>
            </form>
        )
    }
});


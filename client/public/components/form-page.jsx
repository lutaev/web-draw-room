
'use strict';

import React from 'react';
import store from '../js/store';
import {addCode} from '../js/xhr';

export default React.createClass({

    getInitialState() {
        return {
            color: this.props.color,
            code: this.props.code
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
            addCode({
                code: this.state.code,
                color: this.state.color
            }).then(response => {
                store.dispatch({
                    type: 'CODE_ADDED',
                    data: response
                });
            }).catch(error => {
                console.log(error.stack);
                debugger;
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
                        {this.props.colors.map((color, key) => {
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



'use strict';

import React from 'react';
import Form from './form-page';
import Canvas from './canvas-page';
import store from '../js/store';

export default React.createClass ({
    getInitialState() {
        return {
            code: 13
        }
    },

    componentDidMount() {
        store.on('code-added', this.onCodeAdded)
    },

    onCodeAdded() {
        this.setState({code: store.code});
    },

    render() {
        if (!this.state.code) {
            var page = <Form/>
        } else {
            page = <Canvas/>
        }
        return (
            <div>
                <h3>Welcome to our board!</h3>
                <hr/>
                {page}
            </div>
        )
    }
});

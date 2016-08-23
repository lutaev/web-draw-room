
'use strict';

import React from 'react';
import Form from './form-page';
import Canvas from './canvas-page';
import store from '../js/store';

export default React.createClass ({
    getInitialState() {
        return {
            code: null,
            refreshed: false
        }
    },

    componentDidMount() {
        store.on('code-added', this.onCodeAdded);
        store.on('store-refresh', this.refresh);
    },

    onCodeAdded() {
        this.setState({
            code: store.code
        });
    },

    reload: function() {
        this.setState({
            code: null,
            refreshed: false
        });
    },

    refresh() {
        this.setState({
            refreshed: true
        });
    },

    logout: function() {
        window.location.reload();
    },

    render() {
        if (this.state.refreshed) {
            var page = <p className="refreshed text-center">It seems that your partner leave draw board. Please, <a onClick={this.reload}>try again</a></p>
        } else if (!this.state.code) {
            page = <Form/>
        } else {
            page = <Canvas/>
        }

        var logout = this.state.code ? <p className="pull-right text-right"><a onClick={this.logout}>Logout</a></p> : '';

        return (
            <div>
                {logout}
                <h3>Welcome to our board!</h3>
                <hr/>
                {page}
            </div>
        )
    }
});

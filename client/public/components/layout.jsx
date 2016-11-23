
'use strict';

import React from 'react';
import {connect} from 'react-redux';
import FormPage from './form-page';
import CanvasPage from './canvas-page';
import ExitPage from './exit-page';
import store from '../js/store';
import {COLORS} from '../js/core'

export const Layout =  React.createClass ({

    logout: function() {
        store.dispatch({
            type: 'LOGOUT'
        });
    },


    render() {
        if (this.props.code) {
            if (this.props.partner) {
                var page = <CanvasPage partner={this.props.partner} waiting={this.props.waiting} color={this.props.color}/>
            } else {
                if (this.props.waiting) {
                    page = <CanvasPage partner={this.props.partner} waiting={this.props.waiting} color={this.props.color}/>
                } else {
                    page = <ExitPage logout={this.logout}/>
                }
            }
        } else {
            page = <FormPage code={this.props.code} color={this.props.color} colors={COLORS}/>
        }

        var logout = this.props.code ? <p className="pull-right text-right"><a onClick={this.logout}>Logout</a></p> : '';

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

export const LayoutConnected = connect(mapStateToProps)(Layout);

function mapStateToProps(state) {
    return {
        id: state.get('id'),
        code: state.get('code'),
        color: state.get('color'),
        partner: state.get('partner'),
        waiting: state.get('waiting')
    }
}



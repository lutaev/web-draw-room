
'use strict';

import React from 'react';
import Form from './form';
import Canvas from './form';

export default React.createClass ({
    getInitialState() {
        return {
            code: null
        }
    },

    render() {
        if (!this.state.code) {
            var page = <Form/>
        } else {
            page = <Canvas/>
        }
        return (
            <div>
                {page}
            </div>
        )
    }
});

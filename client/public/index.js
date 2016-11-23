
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './js/store';
import {LayoutConnected} from './components/layout';


ReactDOM.render(
    <Provider store={store}>
        <LayoutConnected />
    </Provider>,
    document.getElementById('layout')
);
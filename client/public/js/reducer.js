
'use strict';

import * as core from './core';

export default function(state = core.INITIAL_STATE, action) {
    switch (action.type) {
        case 'CODE_ADDED':
            if (!action.data) {
                return state;
            }
            return core.codeAdded(state, action.data);
        case 'PARTNER_ADDED':
            return core.partnerAdded(state);
        case 'PARTNER_LOST':
            return core.partnerLost(state);
        case 'LOGOUT':
            return core.logout(state);

        case 'INIT_CANVAS':
            return core.initCanvas(state, action.data);
    }

    return state;
}
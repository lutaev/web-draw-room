
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
        //case 'DRAW_START':
        //    return core.drawStart(action.data);
        //case 'DRAW':
        //    return core.draw(action.data);
        //case 'DRAW_STOP':
        //    return core.drawStop();
        //case 'CLEAR_BOARD':
        //    return core.clearBoard();
        //case 'SERVER_DRAW_START':
        //    return core.serverDrawStart(action.data);
        //case 'SERVER_DRAW':
        //    return core.serverDraw(action.data);
        //case 'SERVER_DRAW_STOP':
        //    return core.serverDrawStop(action.data);
        //case 'SERVER_CLEAR_BOARD':
        //    return core.serverClearBoard();
    }

    return state;
}
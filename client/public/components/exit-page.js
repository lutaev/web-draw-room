
'use strict';

import React from 'react';

export default React.createClass ({
    render() {
        return (
            <p className="refreshed text-center">
                It seems that your partner left draw board. Please, <a onClick={this.props.logout}>try again</a>
            </p>
        )
    }
});
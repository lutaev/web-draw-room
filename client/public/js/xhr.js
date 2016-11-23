
'use strict';

import $ from 'jquery';

export function addCode(data) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: '/api/add-code',
            data: data,
            success: response => {
                if (response.status == 200) {
                    resolve(response.person);
                } else {
                    alert(response.message);
                    resolve(null);
                }
            },
            error: reject
        });
    })
}
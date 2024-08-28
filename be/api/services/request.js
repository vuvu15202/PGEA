const request = require('request');
const qs = require('qs');
const https = require('https');

let services = {};
var pool = new https.Agent({ keepAlive: true });

services.callRest = (url, data = {}, query = {}, headers = {}, method = 'POST', timeout = 5000, option = {}) => {
    let options = {
        url,
        method: (method + '').toUpperCase(),
        body: data,
        agent: false,
        pool: { maxSockets: Infinity },
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            // "User-Agent": "request/2.88.0",
            "Accept": "*/*"
        },
        json: true,
        timeout
    };
    options.headers = Object.assign({}, options.headers, headers);
    options = Object.assign({}, options, option)
    if (options.method === 'GET') {

        delete options.body;
    }
    if (Object.keys(query).length) {
        options.url += '?' + qs.stringify(query);
    }
    // console.log({ options })
    return new Promise((resolve, reject) => {
        request(options, function (err, res, body) {
            // console.log({ options, err, body })
            if (err)
                return reject({
                    err,
                    res,
                    body
                });
            return resolve({
                err,
                res,
                body
            })
        })
    })
}

services.instance = request;
module.exports = services;
/**
 * WebSocket Server Settings
 * (sails.config.sockets)
 *
 * Use the settings below to configure realtime functionality in your app.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For all available options, see:
 * https://sailsjs.com/config/sockets
 */

module.exports.uploads = {
    adapter: require('skipper-disk'),
    dirpath: '.tmp/uploads', 
    maxBytes: 30000000 // set max file size upload to 30mb
};


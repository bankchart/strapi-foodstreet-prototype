'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/3.0.0-beta.x/concepts/configurations.html#bootstrap
 */

// module.exports = () => {};

module.exports = () => {
  // import socket io
  var io = require('socket.io')(strapi.server);
  io.on('connection', client => {
    console.log('user connected');
    client.on('disconnect', () => {
        console.log('user disconnected');
    });
  });
  strapi.io = io; // register socket io inside strapi main object to use it globally anywhere
};

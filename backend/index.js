/*
 * Application Init file
 *
 */
const mongoose = require('mongoose');
const server = require('./src/utils/server');

const app = {};

const checkDbConnection = (callback) => {
  if (mongoose.connection.readyState !== 1) {
    setTimeout(() => {
      checkDbConnection(() => {
        callback();
      });
    }, 200);
  } else if (mongoose.connection.readyState === 1) {
    // Run db dependent operations once db is connected: (1)
    callback();
  }
};

app.init = (callback) => {
  // Start backend server (API)
  server.init();
  // Check if db connection is established
  checkDbConnection(() => {
    callback();
  });
};

if (require.main === module) {
  app.init(() => {
    console.log('System running...');
  });
}

module.exports = app;

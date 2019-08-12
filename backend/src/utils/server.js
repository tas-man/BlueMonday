/*
 * Express Server providing the API
 *
 */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const errHandler = require('../handlers/error-handler');
const jwtAuth = require('./jwt-auth');
const conf = require('../../config.json');
const createDemoUser = require('./demo-user');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// JWT Authentication is performed
app.use(jwtAuth());
// API routes
app.use('/api/users', require('../handlers/users/user-controller'));
app.use('/api/jobs', require('../handlers/jobs/job-controller'));
// Global error handler
app.use(errHandler);

// Start Server
const server = {};
const port = conf.API_SERVER_LISTEN_PORT;

server.init = () => {
  app.listen(port, () => {
    console.log('\x1b[36mExpress Server listening on port %s\x1b[0m', port);
  });
  if (conf.DEPLOYMENT_ENV === 'DEMO') {
    createDemoUser();
  }
};

module.exports = server;

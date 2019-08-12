/*
 * API Test Helpers
 *
 */
const http = require('http');
const config = require('../../config.json');

const helpers = {};

// HTTP requests

helpers.makeGetRequest = (path, callback) => {
  const requestDetails = {
    protocol: 'http:',
    hostname: 'localhost',
    port: config.API_SERVER_LISTEN_PORT,
    method: 'GET',
    path,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const req = http.request(requestDetails, (res) => {
    callback(res);
  });
  req.end();
};

helpers.makePostRequest = (path, callback) => {
  const requestDetails = {
    protocol: 'http:',
    hostname: 'localhost',
    port: config.API_SERVER_LISTEN_PORT,
    method: 'POST',
    path,
    headers: {
      'Content-Type': 'application/json',
    },
    /* eslint-disable */
    body: {
      "username": "Tester",
      "password": "VerySecret",
      "firstName": "Test",
      "lastName": "Testison",
      "email": "test123@ijustmadethisup.com"},
    };
  const req = http.request(requestDetails, (res) => {
    callback(res);
  });
  req.end();
};

module.exports = helpers;

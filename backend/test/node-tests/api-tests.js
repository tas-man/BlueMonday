/*
 * API Tests - using Node's built-in assertion library
 *
 */
const assert = require('assert');
const helpers = require('./helpers.js');

const apiTests = {};

// UNAUTHORIZED
apiTests['TEST: api-server should respond 401 to unauthorized request /api/users/curent'] = (done) => {
  helpers.makeGetRequest('/api/users/current', (res) => {
    assert.equal(res.statusCode, 401);
    done();
  });
};

apiTests['TEST: api-server should respond 401 to unauthorized request /api/users/readAll'] = (done) => {
  helpers.makeGetRequest('/api/users/readAll', (res) => {
    assert.equal(res.statusCode, 401);
    done();
  });
};

apiTests['TEST: api-server should respond 401 to unauthorized request /api/users/read'] = (done) => {
  helpers.makeGetRequest('/api/users/read', (res) => {
    assert.equal(res.statusCode, 401);
    done();
  });
};

apiTests['TEST: api-server should respond 401 to unauthorized request /ping'] = (done) => {
  helpers.makeGetRequest('/ping', (res) => {
    assert.equal(res.statusCode, 401);
    done();
  });
};

apiTests['TEST: api-server should respond 401 to unauthorized request /api/users'] = (done) => {
  helpers.makeGetRequest('/api/users', (res) => {
    assert.equal(res.statusCode, 401);
    done();
  });
};

module.exports = apiTests;

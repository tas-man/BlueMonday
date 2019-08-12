/*
 * Test runner
 *
 */
const assert = require('assert');
const api = require('./api-tests');
const app = require('../../index');

_app = {};

_app.tests = {};
_app.tests.api = api;

// Initial test starts the server upon success
_app.initTest = () => {
  try {
    assert.doesNotThrow(() => {
      app.init(() => {
        _app.runTests();
      });
    }, TypeError);
  } catch (e) {
    console.log('\x1b[31mInitial test failed => Could not start server\x1b[0m');
    process.exit();
  }
};

_app.countTests = () => {
  let counter = 0;
  for (const key in _app.tests) {
    if (Object.prototype.hasOwnProperty.call(_app.tests, key)) {
      const tests = _app.tests[key];
      for (const testName in tests) {
        if (Object.prototype.hasOwnProperty.call(tests, testName)) {
          counter++;
        }
      }
    }
  }
  return counter;
};

/* eslint-disable no-loop-func */
// Run all tests, collect errors/successes
_app.runTests = () => {
  const errors = [];
  let successCount = 0;
  const limit = _app.countTests();
  let counter = 0;

  console.log('\x1b[32mInitial test succeeded => Started sever without throwing\x1b[0m');
  // Run all other tests
  for (const key in _app.tests) {
    if (Object.prototype.hasOwnProperty.call(_app.tests, key)) {
      const tests = _app.tests[key];
      for (const testName in tests) {
        if (Object.prototype.hasOwnProperty.call(tests, testName)) {
          const testDesc = testName;
          const testFunc = tests[testName];
          // Run test
          try {
            testFunc(() => {
              // Test succeeded => green
              console.log('\x1b[32m%s\x1b[0m', testDesc);
              counter++;
              successCount++;
              if (counter == limit) {
                _app.produceTestReport(limit, successCount, errors);
              }
            });
          } catch (e) {
            errors.push({
              name: testName,
              error: e,
            });
            // Test failed => red
            console.log('\x1b[31m%s\x1b[0m', testDesc);
            counter++;
            if (counter == limit) {
              _app.produceTestReport(limit, successCount, errors);
            }
          }
        }
      }
    }
  }
};

// Produce test report
_app.produceTestReport = (limit, successCount, errors) => {
  console.log('');
  console.log('-------------BEGIN TEST REPORT-------------');
  console.log('');
  console.log('Total Tests: ', limit);
  console.log('Passed: ', successCount);
  console.log('Failed: ', errors.length);
  console.log('');
  // Errors are printed in detail
  if (errors.length > 0) {
    console.log('-------------BEGIN ERROR DETAILS-------------');
    console.log('');
    errors.forEach((testErr) => {
      console.log('\x1b[31m%s\x1b[0m', testErr.name);
      console.log(testErr.error);
      console.log('');
    });
    console.log('');
    console.log('-------------END ERROR DETAILS-------------');
  }
  console.log('');
  console.log('-------------END TEST REPORT-------------');
  process.exit(0);
};

// _app.runTests();
_app.initTest();

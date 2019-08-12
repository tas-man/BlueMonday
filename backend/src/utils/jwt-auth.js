/*
 * JWT Authentication
 *
 */
const expressJwt = require('express-jwt');
const userService = require('../handlers/users/user-service');
const conf = require('../../config.json');

const isRevokedCallback = async (req, payload, done) => {
  const user = await userService.readCurrent(payload.sub);
  // token is revoked if user no longer exists
  if (!user) {
    return done(null, true);
  }
  return done();
};

const jwtAuth = () => {
  return expressJwt({ secret: conf.JWT_SECRET, isRevoked: isRevokedCallback }).unless({
    path: [
      // public routes, no authentication required
      '/api/users/register',
      '/api/users/authenticate',
    ],
  });
};

module.exports = jwtAuth;

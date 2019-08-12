/*
 * JWT Token Creation
 *
 */
const jwt = require('jsonwebtoken');
const conf = require('../../config.json');

const createJwtToken = (userId, isAdmin, exp) => {
  return jwt.sign(
    {
      sub: userId,
      admin: isAdmin,
    },
    conf.JWT_SECRET,
    {
      expiresIn: exp,
    },
  );
};

module.exports = createJwtToken;

/*
 * User handler functions (database operations)
 *
 */
const bcrypt = require('bcryptjs');
const dbConn = require('../../utils/db-connector');
const createJwtToken = require('../../utils/jwt-creator');
const conf = require('../../../config.json');

const User = dbConn.User;

// ----- Public routes -----

const create = async (params) => {
  console.log('Received API call: users/register');
  if (conf.DEPLOYMENT_ENV === 'DEMO') {
    throw new Error('User registration not possible in DEMO version!');
  }
  if (await User.findOne({ username: params.username })) {
    throw new Error('Username already exists');
  }
  if (await User.findOne({ email: params.email })) {
    throw new Error('Email address already in use');
  }
  if (params.password.length < 10) {
    throw new Error('Password is too short');
  }
  const user = new User(params);
  if (params.password) {
    user.hash = bcrypt.hashSync(params.password, 10);
  }
  // if this is the first user registered, grant admin rights
  if (await User.countDocuments() === 0) {
    user.isAdmin = true;
  }
  await user.save();
};

const authenticate = async ({ username, password }) => {
  console.log('Received API call: users/authenticate');
  const user = await User.findOne({ username });
  if (user && bcrypt.compareSync(password, user.hash)) {
    const accessToken = createJwtToken(
      user.id, user.isAdmin, 3600 * 24, // 24 hours
    );
    return { access_token: accessToken };
  }
  return null;
};

// ----- Routes requiring authentication -----

const logout = async (id) => {
  console.log('Received API call: users/logout');
  const user = await User.findById(id);
  if (user) {
    return {};
  }
  return null;
};

const readCurrent = async (id) => {
  console.log('Received API call: users/readCurrent');
  return User.findById(id).select('-hash');
};

// get properties of all users --- ADMIN ONLY
const readAll = async (currentUser) => {
  console.log('Received API call: users/readAll');
  if (currentUser.admin) {
    return User.find().select('-hash');
  }
  throw new Error('Action requires admin rights');
};

// get properties of a single user --- ADMIN ONLY
const read = async (currentUser, id) => {
  console.log('Received API call: users/read');
  if (currentUser.admin || currentUser.sub === id) {
    const user = await User.findById(id);
    // remove hash before returning user data
    const { hash, activeToken, ...userNoHash } = user.toObject();
    return { ...userNoHash };
  }
  throw new Error('Action requires admin rights');
};

const update = async (currentUser, id, newParams) => {
  console.log('Received API call: users/update');
  if (currentUser.admin || currentUser.sub === id) {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User could not be found');
    }
    if (user.username !== newParams.username && await User.findOne({ username: newParams.username })) {
      throw new Error('Username already exists');
    }
    if (newParams.password) {
      newParams.hash = bcrypt.hashSync(newParams.password, 10);
    }
    // only admin may grant/revoke admin rights
    if (newParams.isAdmin != null && currentUser.admin) {
      // verify there is at least one admin in database at all times
      if (newParams.isAdmin === false
        && (await User.countDocuments({ isAdmin: true }) < 2)
        && user.isAdmin) {
        throw new Error('Cannot revoke last admin rights');
      }
    } else if (newParams.isAdmin != null) {
      newParams.isAdmin = user.isAdmin;
    }
    Object.assign(user, newParams);
    await user.save();
    return user;
  }
  return null;
};

const remove = async (currentUser, id) => {
  console.log('Received API call: users/remove');
  if (currentUser.admin || currentUser.sub === id) {
    const user = await User.findById(id);
    if (user.isAdmin) {
      // verify there is at least one admin in database at all times
      if (await User.countDocuments({ isAdmin: true }) > 1) {
        await User.findOneAndDelete({ _id: id });
      }
      throw new Error('Cannot delete last admin');
    }
    await User.findOneAndDelete({ _id: id });
  }
  throw new Error('Action requires admin rights');
};

module.exports = {
  create,
  authenticate,
  logout,
  readCurrent,
  readAll,
  read,
  update,
  remove,
};

/*
 * User request handler
 *
 */
const express = require('express');
const userService = require('./user-service');

const router = express.Router();

// register new user
const register = (req, res, next) => {
  userService.create(req.body)
    .then(() => {
      return res.json({});
    })
    .catch(err => next(err));
};

// authenticate existing user
const authenticate = (req, res, next) => {
  userService.authenticate(req.body)
    .then((user) => {
      if (user) {
        return res.json(user);
      }
      return res.status(400).json({ message: 'Incorrect username or password' });
    })
    .catch(err => next(err));
};

// logout existing user
const logout = (req, res, next) => {
  userService.logout(req.user.sub)
    .then(() => {
      return res.json({});
    })
    .catch(err => next(err));
};

// get current user details
const readCurrent = (req, res, next) => {
  userService.readCurrent(req.user.sub)
    .then((user) => {
      if (user) {
        return res.json(user);
      }
      return res.status(404).json({ message: 'Not found' });
    })
    .catch(err => next(err));
};

// get user details based on id
const readAll = (req, res, next) => {
  userService.readAll(req.user)
    .then((users) => {
      return res.json(users);
    })
    .catch(err => next(err));
};

// get user details based on id
const read = (req, res, next) => {
  userService.read(req.user, req.query.id)
    .then((user) => {
      if (user) {
        return res.json(user);
      }
      return res.status(404).json({ message: 'Not found' });
    })
    .catch(err => next(err));
};

// update user details based on id
const update = (req, res, next) => {
  userService.update(req.user, req.query.id, req.body)
    .then((user) => {
      return res.json(user);
    })
    .catch(err => next(err));
};

// remove user based on id
const remove = (req, res, next) => {
  userService.remove(req.user, req.query.id)
    .then(() => {
      return res.json({});
    })
    .catch(err => next(err));
};

// API routes
router.post('/register', register);
router.post('/authenticate', authenticate);
router.post('/logout', logout);
router.get('/current', readCurrent);
router.get('/readAll', readAll);
router.get('/read', read);
router.put('/update', update);
router.delete('/remove', remove);

module.exports = router;

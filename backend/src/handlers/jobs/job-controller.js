/*
 * Job request handler
 *
 */
const express = require('express');
const jobService = require('./job-service');

const router = express.Router();

// register new job
const create = (req, res, next) => {
  jobService.create(req.user.sub, req.body)
    .then((success) => {
      if (success) {
        return res.json(success);
      }
      return res.status(400).json({ message: 'Encountered problem creating job, please try again' });
    })
    .catch(err => next(err));
};

// get all jobs
const readAll = (req, res, next) => {
  jobService.readAll(req.user.sub)
    .then((jobs) => {
      if (jobs) {
        return res.json(jobs);
      }
      return res.status(404).json({ message: 'Not found' });
    })
    .catch(err => next(err));
};

// get job details based on id
const read = (req, res, next) => {
  jobService.read(req.user.sub, req.query.id)
    .then((job) => {
      if (job) {
        return res.json(job);
      }
      return res.status(404).json({ message: 'Not found' });
    })
    .catch(err => next(err));
};

// update job details based on id
const update = (req, res, next) => {
  jobService.update(req.user.sub, req.query.id, req.body)
    .then((job) => {
      if (job) {
        return res.json(job);
      }
      return res.status(400).json({ message: 'Job could not be updated' });
    })
    .catch(err => next(err));
};

// remove job based on id
const remove = (req, res, next) => {
  jobService.remove(req.user.sub, req.query.id)
    .then((success) => {
      if (success) {
        return res.json(success);
      }
      return res.status(400).json({ message: 'Job could not be removed' });
    })
    .catch(err => next(err));
};

// API routes
router.post('/create', create);
router.get('/readAll', readAll);
router.get('/read', read);
router.put('/update', update);
router.delete('/remove', remove);

module.exports = router;

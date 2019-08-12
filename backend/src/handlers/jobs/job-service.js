/*
 * job handler functions (database operations)
 *
 */
const dbConn = require('../../utils/db-connector');

const User = dbConn.User;
const Job = dbConn.Job;
const Task = dbConn.Task;

// ----- Public routes -----

const create = async (currentUser, params) => {
  console.log('Received API call: jobs/create');
  const user = await User.findById(currentUser);
  const job = new Job(params);
  job.owner = user.id;
  await job.save();
  return job;
};

const readAll = async (currentUser) => {
  const user = await User.findById(currentUser);
  const jobs = await Job.find({});
  const currentUserJobs = [];
  // return only jobs belongin to current user
  for (let i = 0; i < jobs.length; i++) {
    if (jobs[i].owner === user.id) {
      currentUserJobs.push(jobs[i]);
    }
  }
  return currentUserJobs;
};

const read = async (currentUser, id) => {
  console.log('Received API call: jobs/read');
  const user = await User.findById(currentUser);
  const job = await Job.findById(id);
  // verify current user is owner of job
  if (job.owner === user.id) {
    return job;
  }
  return null;
};

const update = async (currentUser, id, newParams) => {
  console.log('Received API call: jobs/update');
  const user = await User.findById(currentUser);
  const job = await Job.findById(id);
  // verify current user is owner of job
  if (job.owner === user.id) {
    // update job with new properties and store to db
    Object.assign(job, newParams);
    await job.save();
    return job;
  }
  return null;
};

const remove = async (currentUser, id) => {
  console.log('Received API call: jobs/remove');
  const user = await User.findById(currentUser);
  const job = await Job.findById(id);
  if (job && job.owner === user.id) {
    await Job.findOneAndDelete({ _id: id });
    return {};
  }
  return null;
};

module.exports = {
  create,
  readAll,
  read,
  update,
  remove,
};

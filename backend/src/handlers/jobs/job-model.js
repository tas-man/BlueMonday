/*
 * job schema for MongoDB
 *
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  jobTitle: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  owner: { type: String, required: true },
  tasks: { type: Array, required: true, default: [] },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Job', schema);

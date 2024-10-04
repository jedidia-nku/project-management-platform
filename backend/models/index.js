const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['admin', 'editor', 'viewer', 'data-entry'] },
  organizations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Organization' }],
});

const organizationSchema = new mongoose.Schema({
  name: String,
  users: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: { type: String, enum: ['admin', 'editor', 'viewer', 'data-entry'] },
  }],
});

const projectSchema = new mongoose.Schema({
  projName: String,
  description: String,
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  activities: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    action: String,
    timestamp: { type: Date, default: Date.now },
    userRole: String,
  }],
});

const User = mongoose.model('User', userSchema);
const Organization = mongoose.model('Organization', organizationSchema);
const Project = mongoose.model('Project', projectSchema);

module.exports = { User, Organization, Project };
// src/routes/users.js;
const express = require('express');
const router = express.Router();
const { User } = require('../models');

// Create a new user
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;


// src/routes/organizations.js;
const express = require('express');
const router = express.Router();
const { Organization, User } = require('../models');

// Create a new organization
router.post('/', async (req, res) => {
  try {
    const organization = new Organization(req.body);
    await organization.save();
    res.status(201).json(organization);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all organization
router.get('/allOrganization', async(req, res) => {
  try {
    const organization = await Organization.find();
    res.json(organization);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

// Add user to organization
router.post('/:id/users', async (req, res) => {
  try {
    const { userId, role } = req.body;
    const organization = await Organization.findById(req.params.id);
    const user = await User.findById(userId);

    if (!organization || !user) {
      return res.status(404).json({ error: 'Organization or User not found' });
    }

    organization.users.push({ user: userId, role });
    user.organizations.push(organization._id);

    await organization.save();
    await user.save();

    res.json(organization);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Change user role in organization
router.put('/:id/users/:userId', async (req, res) => {
  try {
    const { role } = req.body;
    const organization = await Organization.findById(req.params.id);

    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    const userIndex = organization.users.findIndex(u => u.user.toString() === req.params.userId);

    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found in organization' });
    }

    organization.users[userIndex].role = role;
    await organization.save();

    res.json(organization);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;


// src/routes/projects.js;
const express = require('express');
const router = express.Router();
const { Project, User, Organization } = require('../models');

// Create a new project
router.post('/', async (req, res) => {
  try {
    const { name, description, organizationId, ownerId } = req.body;
    const project = new Project({ name, description, organization: organizationId, owner: ownerId });
    
    const user = await User.findById(ownerId);
    const organization = await Organization.findById(organizationId);

    if (!user || !organization) {
      return res.status(404).json({ error: 'User or Organization not found' });
    }

    const userRole = organization.users.find(u => u.user.toString() === ownerId)?.role;

    project.activities.push({
      user: ownerId,
      action: 'created',
      userRole,
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a project
router.put('/:id', async (req, res) => {
  try {
    const { name, description, userId } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const organization = await Organization.findById(project.organization);
    const userRole = organization.users.find(u => u.user.toString() === userId)?.role;

    if (name) project.name = name;
    if (description) project.description = description;

    project.activities.push({
      user: userId,
      action: 'updated',
      userRole,
    });

    await project.save();
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all projects
router.get('/allProjects', async (req, res) => {
  try {
    const projects = await Project.find();

    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all projects for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const projects = await Project.find({
      $or: [
        { owner: user._id },
        { organization: { $in: user.organizations } }
      ]
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
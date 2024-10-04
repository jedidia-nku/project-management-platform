// src/routes/projects.js;
const express = require('express');
const router = express.Router();
const { Project, User, Organization } = require('../models');

// Create a new project
router.post('/', async (req, res) => {
  try {
    const { projName, description, organizationId, ownerId, name } = req.body;
    const project = new Project({ projName, description, organization: organizationId, owner: ownerId, name });
    
    const user = await User.findById(ownerId);
    const organization = await Organization.findById(organizationId);

    if (!user || !organization) {
      return res.status(404).json({ error: 'User or Organization not found' });
    }

    const userRole = organization.users.find(u => u.user.toString() === ownerId)?.role;

    project.activities.push({
      user: ownerId,
      name: name,
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
    const { projName, description, userId, name } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const organization = await Organization.findById(project.organization);
    const userRole = organization.users.find(u => u.user.toString() === userId)?.role;

    if (projName) project.projName = projName;
    if (description) project.description = description;

    project.activities.push({
      user: userId,
      name: name,
      action: 'updated',
      userRole,
    });

    await project.save();
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a project
router.delete('/:id', async (req, res) => {
  try {
    const { userId, name } = req.body;  // Remove unused variables

    // Find the project by ID
    const project = await Project.findById(req.params.id);

    // Check if the project exists
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Find the organization the project belongs to
    const organization = await Organization.findById(project.organization);

    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    // Check if the user has the required role or permissions
    const userRole = organization.users.find(u => u.user.toString() === userId)?.role;

    if (!userRole) {
      return res.status(403).json({ error: 'User does not have permission to delete this project' });
    }

    // Delete the project
    await project.deleteOne();

    // Respond with a success message
    res.json({ message: 'Project successfully deleted' });
  } catch (error) {
    // Return the error message
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
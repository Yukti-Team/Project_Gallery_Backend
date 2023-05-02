const express = require('express');
const { createProject, deleteProject, updateProject, getProject, filterProject } = require('../controller/projectController');
const { verifyToken } = require('../Middleware/authmiddleware');

Router = express.Router();

Router.route('/create').post(verifyToken, createProject);
Router.route('/delete/:id').delete(verifyToken, deleteProject);
Router.route('/update/:id').patch(verifyToken, updateProject);
Router.route('/get/:id').get(verifyToken, getProject);
Router.route('/filter').get(verifyToken, filterProject);

module.exports = Router;

// branch, domain, stack, year, status, rating

const express = require('express');
const { createProject, deleteProject, updateProject, getProject, filterProject } = require('../controller/projectController');

Router = express.Router();

Router.route('/create').post(createProject);
Router.route('/delete/:id').delete(deleteProject);
Router.route('/update/:id').patch(updateProject);
Router.route('/get/:id').get(getProject);
Router.route('/filter').get(filterProject);

module.exports = Router; 

// branch, domain, stack, year, status, rating

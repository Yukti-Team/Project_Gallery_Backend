const express = require('express');
const { createProject, deleteProject, updateProject, getProject } = require('../controller/projectController');
const { isAuthenticated } = require("../Middleware/authmiddleware");

Router = express.Router();

Router.route('/create').post(createProject);
Router.route('/delete/:id').delete(deleteProject);
Router.route('/update/:id').patch(updateProject);
Router.route('/get/:id').get(getProject);


module.exports = Router; 
const express = require('express');
const {createProject} = require('../controller/projectController');
const {isAuthenticated} = require("../Middleware/authmiddleware");

Router = express.Router();

Router.route('/create').post(isAuthenticated, createProject);

module.exports = Router;
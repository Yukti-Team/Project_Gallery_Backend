const express = require("express");
const {isAuthenticated} = require("../Middleware/authmiddleware");
const {login, signUp} = require("../controller/userController");
const Router = express.Router();

Router.route("/signup").post(signUp);
Router.route("/login").post(login);

//changepwd, updateprofile, getuserdata 

module.exports = Router;
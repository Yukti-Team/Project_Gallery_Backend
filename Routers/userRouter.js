const express = require("express");
const {login, signUp, getUser, updateUser} = require("../controller/userController");
const Router = express.Router();

Router.route("/signup").post(signUp);
Router.route("/login").post(login);
Router.route("/:id").get(getUser);
Router.route("/update/:id").patch(updateUser);


//changepwd, updateprofile, getuserdata 

module.exports = Router;
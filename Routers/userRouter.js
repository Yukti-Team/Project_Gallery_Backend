const express = require("express");
const { login, signUp, getUser, updateUser, checkUserName, deleteUser } = require("../controller/userController");
const Router = express.Router();

Router.route("/signup").post(signUp);
Router.route("/login").post(login);
Router.route("/:id").get(getUser);
Router.route("/update/:id").patch(updateUser);
Router.route('/delete/:id').delete(deleteUser);
Router.route('/check-username').post(checkUserName);

//changepwd, updateprofile, getuserdata 

module.exports = Router;
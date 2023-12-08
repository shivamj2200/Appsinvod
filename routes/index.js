const express = require("express");
const controller =  require("../controllers/index")
const auth = require('../middlewares/auth')
const Router = express.Router();

Router.post("/registeruser",controller.createUserHandler.createUser);
Router.post("/changeUserStatus",auth.authHandler,controller.changeUserStatusHandler.changeUserStatus);
// Router.get("/getDistance",auth.authHandler,controller.distanceHandler.getDistance)
Router.get("/getDistance",auth.authHandler,controller.distanceHandler.getDistance)
Router.get("/userList/:weekdays",auth.authHandler,controller.userListHandler.userList)

module.exports = Router
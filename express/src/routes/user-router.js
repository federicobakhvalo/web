const express = require("express");
const userRouter = express.Router();

const {
  addUser,
  getUsers,
  postUser,
} = require("../controllers/user-controller.js");

userRouter.get("/create", addUser);
userRouter.get("/", getUsers);
userRouter.post("/postuser", postUser);

module.exports = userRouter;

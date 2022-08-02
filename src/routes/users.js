const express = require("express");
const userControllers = require("../controller/users");
const userRoutes = express.Router();

userRoutes.get("/", userControllers.getUsers);
userRoutes.get("/:userId", userControllers.getUserById);
userRoutes.post("/", userControllers.addUser);
// userRoutes.patch("/me", userControllers.updateProfile);
// userRoutes.patch("/avatar", userControllers.updateAvatar);

module.exports = {
  userRoutes
};

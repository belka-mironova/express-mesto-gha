const express = require('express');
const userControllers = require('../controller/users');
const { validateCardData } = require('../middlewares/validations');

const userRoutes = express.Router();

userRoutes.get('/', userControllers.getUsers);
userRoutes.get('/:userId', userControllers.getUserById);
userRoutes.get('/me', userControllers.getUserInfo);
userRoutes.patch('/me', userControllers.updateProfile);
userRoutes.patch('/me/avatar', userControllers.updateAvatar);

module.exports = {
  userRoutes,
};

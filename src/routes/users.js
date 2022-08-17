const express = require('express');
const userControllers = require('../controller/users');
const { validateUserId, validateUserData, validateAvatar } = require('../middlewares/validations');

const userRoutes = express.Router();

userRoutes.get('/', userControllers.getUsers);
userRoutes.get('/me', userControllers.getUserInfo);
userRoutes.get('/:userId', validateUserId, userControllers.getUserById);
userRoutes.patch('/me', validateUserData, userControllers.updateProfile);
userRoutes.patch('/me/avatar', validateAvatar, userControllers.updateAvatar);

module.exports = {
  userRoutes,
};

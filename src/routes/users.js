const express = require('express');
const userControllers = require('../controller/users');
const { validateId, validateUserData, validateAvatar } = require('../middlewares/validations');

const userRoutes = express.Router();

userRoutes.get('/', userControllers.getUsers);
userRoutes.get('/:userId', validateId, userControllers.getUserById);
userRoutes.get('/me', userControllers.getUserInfo);
userRoutes.patch('/me', validateUserData, userControllers.updateProfile);
userRoutes.patch('/me/avatar', validateAvatar, userControllers.updateAvatar);

module.exports = {
  userRoutes,
};

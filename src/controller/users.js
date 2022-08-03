const User = require('../models/user');

const { errorMessage } = require('../../utils/error');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => errorMessage(err, req, res));
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => errorMessage(err, req, res));
};

const addUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => errorMessage(err, req, res));
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => errorMessage(err, req, res));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => errorMessage(err, req, res));
};

module.exports = {
  getUsers,
  getUserById,
  addUser,
  updateProfile,
  updateAvatar,
};

const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({}).then((users) => res.send({ data: users }));
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId).then((user) => res.send({ data: user }));
};

const addUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar }).then((user) => res.send(user)).catch(err => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

module.exports = { getUsers, getUserById, addUser };

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { SALT_ROUND, JWT_SECRET } = require('../configs/index');
const {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
  RequestError,
} = require('../errors');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        next(new NotFoundError('Data is not found'));
      } else {
        next(err);
      }
    });
};
const getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError(`There is no user with id ${req.params.id}`);
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new RequestError('Data is not valid or Bad request'));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('User with this email already exists');
      }
      return bcrypt
        .hash(password, SALT_ROUND)
        .then((hash) => User.create({
          name, about, avatar, email, password: hash,
        }))
        .then(() => res.status(201).send({ data: user }))
        .catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError('User with this email already exists'));
          } else if (err.name === 'ValidationError' || err.name === 'CastError') {
            next(new RequestError('Bad request'));
          } else {
            next(err);
          }
        });
    });
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError(`There is no user with id ${req.params.id}`);
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new RequestError('Data is not valid or Bad request'));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError(`There is no user with id ${req.params.id}`);
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new RequestError('Data is not valid or Bad request'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('There is no user with such email');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Email or password are incorrect');
          }
          const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
          res.status(200).send({ token });
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new RequestError('Data is not valid or Bad request'));
      } else {
        next(err);
      }
    });
};

const getUserInfo = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError(`There is no user with ${req.params.id}`);
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new RequestError('Data is not valid or Bad request'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getUserInfo,
};

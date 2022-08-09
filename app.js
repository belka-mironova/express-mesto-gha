const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');

const { login, createUser } = require('./src/controller/users');
const auth = require('./src/middlewares/auth');

const { userRoutes } = require('./src/routes/users');
const { cardRoutes } = require('./src/routes/cards');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.use(express.json());

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/),
    }),
  }),
  createUser,
);

app.use(auth);

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

app.use((req, res) => res.status(404).send({ message: 'Страницы не существует' }));

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

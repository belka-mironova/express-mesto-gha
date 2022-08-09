const express = require('express');
const mongoose = require('mongoose');

const { login, createUser } = require('./src/controller/users');
const auth = require('./src/middlewares/auth');

const { userRoutes } = require('./src/routes/users');
const { cardRoutes } = require('./src/routes/cards');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.use(express.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

app.use((req, res) => res.status(404).send({ message: 'Страницы не существует' }));

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

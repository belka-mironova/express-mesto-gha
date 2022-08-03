const express = require('express');
const mongoose = require('mongoose');

const { userRoutes } = require('./src/routes/users');
const { cardRoutes } = require('./src/routes/cards');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '62e902d9fcd9c43543e311fc',
  };

  next();
});

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

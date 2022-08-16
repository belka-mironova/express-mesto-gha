const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { routes } = require('./src/routes');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.use(express.json());

app.use(routes);

app.use(errors());

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

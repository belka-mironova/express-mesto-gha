const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const routes = require('./src/routes');

const app = express();

app.use(express.json());

app.use(routes);

app.use(errors());

const { PORT = 3000 } = process.env;

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
  console.log('Connected to Data Base');

  await app.listen(PORT);
  console.log(`App listening on port ${PORT}`);
}

main();

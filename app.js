const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const errorHandler = require('./src/utils/errorHandler');
const routes = require('./src/routes');

const app = express();

app.use(express.json());

app.use(routes);

app.use(errors());
app.use(errorHandler);

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.listen(PORT);

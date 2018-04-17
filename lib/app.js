const express = require('express');
const app = express();
const teas = require('./routes/teas');

app.use(express.json());

app.use('/teas', teas);

module.exports = app;
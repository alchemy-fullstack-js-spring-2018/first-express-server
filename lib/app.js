const express = require('express');
const app = express();
const cats = require('./routes/cats');

app.use(express.json());

app.use('/cats', cats);

module.exports = app;
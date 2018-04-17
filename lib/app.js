const express = require('express');
const app = express();
const museums = require('./routes/museums');

app.use(express.json());

app.use('/museums', museums);

module.exports = app;
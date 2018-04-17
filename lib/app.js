const express = require('express');
const app = express();
const gems = require('./routes/gem');

app.use(express.json());

app.use('/gems', gems);

module.exports = app;
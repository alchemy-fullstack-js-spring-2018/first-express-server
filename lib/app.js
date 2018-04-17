const express = require('express');
const app = express();
const nostalgia = require('./routes/nostalgia');

app.use(express.json());

app.use('/nostalgia', nostalgia);

module.exports = app;
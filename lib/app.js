const express = require('express');
const app = express();
const trails = require('./routes/trails');

app.use(express.json());

app.use('/trails', trails);

module.exports = app;
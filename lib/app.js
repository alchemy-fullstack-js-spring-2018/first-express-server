const express = require('express');
const app = express();
const teams = require('./routes/teams');

app.use(express.json());

app.use('/teams', teams);

module.exports = app;
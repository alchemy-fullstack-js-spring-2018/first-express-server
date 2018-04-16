const express = require('express');
const app = express();
const resources = require('./routes/resources');

app.use(express.json());

app.use('/resources', resources);

module.exports = app;
const express = require('express');
const app = express();
const trails = require('./routes/trials');

app.use(express.json());

app.use('/trails', trails);

module.exports = app;
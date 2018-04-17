const express = require('express');
const app = express();
const pets = require('./routes/pets');

app.use(express.json());

app.use('/pets', pets);

module.exports = app;
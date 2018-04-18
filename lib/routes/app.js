const express = require('express');
const app = express(); //we're setting app equal to the express function call
const videogames = require('./videogames');

app.use(express.json()); // if i have a JSON body in my request, parse it and put on my json.body.

app.use('/videogames', videogames); //resgistering a route using express

module.exports = app;

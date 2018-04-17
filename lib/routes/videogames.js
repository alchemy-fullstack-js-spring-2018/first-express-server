//building our  router for our express app.
//routing is just determining how your application responds to a client request.
//it does this by having hard-coded route paths think '/' as a request and responds with a function.
const express = require('express');
const videogames = require('../models/videogames');
const Router = express.Router;
const router = new Router();

module.exports = router 
    .post('/', (req, res) => {
        videogames.save(req.body)
            .then(games => res.json(games));

    }); 
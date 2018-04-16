const express = require('express');
const Pokemon = require('../models/pokemon');
const Router = express.Router;
const router = new Router();

module.exports = router
    .post('/', (req, res) => {
        Pokemon.save(req.body)
            .then(pokemon => res.json(pokemon));
    });
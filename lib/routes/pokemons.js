const express = require('express');
const Pokemon = require('../models/pokemon');
const Router = express.Router;
const router = new Router();

module.exports = router
    .post('/', (req, res) => {
        Pokemon.save(req.body)
            .then(pokemon => res.json(pokemon));
    })
    
    .put('/:id', (req, res) => {
        Pokemon.findByIdAndUpdate(req.params.id, req.body)
            .then(pokemon => res.json(pokemon));
    });
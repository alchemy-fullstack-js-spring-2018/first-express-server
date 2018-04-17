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
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;

        Pokemon.findById(id)
            .then(pokemon => {
                if(!pokemon) {
                    res.status(404).json({
                        error: `pokemon if ${id} does not exist`
                    });
                }
                else res.json(pokemon);
            });
    })

    .get('/', (req, res) => {
        Pokemon.find()
            .then(pokemons => res.json(pokemons));
    });
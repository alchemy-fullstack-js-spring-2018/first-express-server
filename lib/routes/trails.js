const router = require('express').Router();
const Trail = require('../models/trail');

module.exports = router
    .post('/', (req, res) => {
        Trail.save(req.body)
            .then(trail => res.json(trail));
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;

        Trail.findById(id)
            .then(trail => res.json(trail));
    });
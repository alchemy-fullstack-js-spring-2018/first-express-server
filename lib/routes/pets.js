const router = require('express').Router();
const Pet = require('../models/model');
const errorHandler = require('../error-handler');

module.exports = router
    .post('/', (req, res) => {
        Pet.save(req.body)
            .then(pet => res.json(pet))
            .catch(err => errorHandler(err, req, res));
    })

    .get('/', (req, res) => {
        Pet.find()
            .then(pets=> res.json(pets))
            .catch(err => errorHandler(err, req, res));
    });
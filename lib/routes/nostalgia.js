const router = require('express').Router();
const Nostalgia = require('../models/model');
const errorHandler = require('../error-handler');

module.exports = router

    .post('/', (req, res) => {
        Nostalgia.save(req.body)
            .then(band => res.json(band))
            .catch(err => errorHandler(err, req, res));
    })
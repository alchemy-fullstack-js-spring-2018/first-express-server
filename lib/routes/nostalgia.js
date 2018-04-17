const router = require('express').Router();
const Nostalgia = require('../models/model');
const errorHandler = require('../error-handler');

module.exports = router

    .post('/', (req, res) => {
        Nostalgia.save(req.body)
            .then(band => res.json(band))
            .catch(err => errorHandler(err, req, res));
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;

        Nostalgia.findById(id)
            .then(band => {
                if(!band) {
                    errorHandler({
                        status: 404,
                        error: `Band id ${id} not cool`
                    }, req, res);
                }
                else res.json(band);
            })
            .catch(err => errorHandler(err, req, res));
    })

    .get('/', (req, res) => {
        Nostalgia.find()
            .then(bands => res.json({ bands }))
            .catch(err => errorHandler(err, req, res));
    })

    .put('/:id', (req, res) => {
        Nostalgia.findByIdAndUpdate(req.params.id, req.body)
            .then(band => res.json(band))
            .catch(err => errorHandler(err, req, res));
    });
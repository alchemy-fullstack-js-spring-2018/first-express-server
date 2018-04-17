const router = require('express').Router();
const Band = require('../models/model');
const errorHandler = require('../error-handler');

module.exports = router
    .post('/', (req, res) => {
        Band.save(req.body)
            .then(band => res.json(band))
            .catch(err => errorHandler(err, req, res));
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;

        Band.findById(id)
            .then(band => {
                if(!band) {
                    errorHandler({
                        status: 404,
                        error: `Band id ${id} does not exist`
                    }, req, res);
                }
                else res.json(band);
            })
            .catch(err => errorHandler(err, req, res));
    })

    .get('/', (req, res) => {
        Band.find()
            .then(bands => res.json(bands))
            .catch(err => errorHandler(err, req, res));
    })

    .put('/:id', (req, res) => {
        Band.findByIdAndUpdate(req.params.id, req.body)
            .then(band => res.json(band))
            .catch(err => errorHandler(err, req, res));
    })

    .delete('/:id', (req, res) => {
        Band.findByIdAndRemove(req.params.id)
            .then(removed => res.json({ removed }))
            .catch(err => errorHandler(err, req, res));
    });
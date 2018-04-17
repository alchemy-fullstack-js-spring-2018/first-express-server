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
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;

        Pet.findById(id)
            .then(pet => {
                if(!pet) {
                    errorHandler({
                        status: 404,
                        error: `Pet id ${id} does not exist`
                    }, req, res);
                }
                else {
                    res.json(pet);
                }
            }).catch(err => errorHandler(err, req, res));
    })

    .put('/:id', (req, res) => {
        Pet.findByIdAndUpdate(req.params.id, req.body)
            .then(pet => res.json(pet))
            .catch(err => errorHandler(err, req, res));
    })

    .delete('/:id', (req, res) => {
        const { id } = req.params;

        Pet.findByIdAndRemove(id)
            .then(removed => res.json({ removed }))
            .catch(err => errorHandler(err, req, res));
    });
const router = require('express').Router();
const Museum = require('../models/model');
const errorHandler = require('../error-handler');

module.exports = router
    .post('/', (req, res) => {
        Museum.save(req.body)
            .then(museum => res.json(museum))
            .catch(err => errorHandler(err, req, res));
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;

        Museum.findById(id)
            .then(museum => {
                if(!museum) {
                    errorHandler({ 
                        status: 404, 
                        error: `Museum with id ${id} not found` 
                    }, req, res);
                }
                else res.json(museum);
            })
            .catch(err => errorHandler(err, req, res));
    })
    .get('/', (req, res) => {
        Museum.find()
            .then(museums => res.json(museums))
            .catch(err => errorHandler(err, req, res));
    })
    .delete('/:id', (req, res) => {
        Museum.findByIdAndRemove(req.params.id)
            .then(removed => res.json({ removed }))
            .catch(err => errorHandler(err, req, res));
    })
    .put('/:id', (req, res) => {
        Museum.findByIdAndUpdate(req.params.id, req.body)
            .then(museum => res.json(museum))
            .catch(err => errorHandler(err, req, res));
    });

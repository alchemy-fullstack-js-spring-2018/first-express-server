const router = require('express').Router();
const Trail = require('../models/trail');
const errorHandler = require('../error-handler');

module.exports = router
    .post('/', (req, res) => {
        Trail.save(req.body)
            .then(trail => res.json(trail));
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;

        Trail.findById(id)
            .then(trail => {
                if(!trail) {
                    errorHandler({
                        status: 404,
                        error: `Trail id ${id} does not exist`
                    }, req, res);
                }
                else res.json(trail);
            });
    })

    .get('/', (req, res) => {
        Trail.find(req.body)
            .then(trail => res.json(trail));
    })

    .put('/:id', (req, res) => {
        const { id } = req.params;

        Trail.findByIdAndUpdate(id, req.body)
            .then(trail => res.json(trail));
    })

    .delete('/:id', (req, res) => {
        const { id } = req.params;

        Trail.findByIdAndRemove(id)
            .then(removed => res.json({ removed }));
    });
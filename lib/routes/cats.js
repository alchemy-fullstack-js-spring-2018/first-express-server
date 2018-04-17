const router = require('express').Router();
const Cat = require('../models/model');
const errorHandler = require('../error-handler');

module.exports = router
    .get('/', (req, res) => {
        Cat.find()
            .then(cats => res.json(cats))
            .catch(err => errorHandler(err, req, res));
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;

        Cat.findById(id)
            .then(cat => {
                if(!cat) {
                    errorHandler({
                        status: 404,
                        error: `Cat with id "${id}" not found.`
                    }, req, res);
                }
                res.json(cat);
            })
            .catch(err => errorHandler(err, req, res));
    })

    .post('/', (req, res) => {
        Cat.save(req.body)
            .then(cat => res.json(cat))
            .catch(err => errorHandler(err, req, res));
    })

    .put('/:id', (req, res) => {
        Cat.findByIdAndUpdate(req.params.id, req.body)
            .then(cat => res.json(cat))
            .catch(err => errorHandler(err, req, res));
    })

    .delete('/:id', (req, res) => {
        Cat.findByIdAndRemove(req.params.id)
            .then(existed => res.json({ existed }))
            .catch(err => errorHandler(err, req, res));
    });

const router = require('express').Router();
const Hero = require('../lib/models/model');
const errorHandler = require('../error-handler');

// save, findById, findByIdAndUpdate, findAll, findByIdAndRemove

module.exports = router
    .post('/', (req, res) => {
        Hero.save(req.body)
            .then(hero => res.json(hero))
            .catch(err => errorHandler(err, req, res));
    })
    .get('/:id', (req, res) => {
        Hero.findById(req.params.id)
            .then(hero => {
                if(!hero) {
                    errorHandler({
                        status: 404,
                        error: `Hero id ${req.params.id} does not exist`
                    }, req, res);
                } else res.json(hero);
            })
            .catch(err => errorHandler(err, req, res));
    })
    .get('/', (req, res) => {
        Hero.find()
            .then(heroes => res.json(heroes))
            .catch(err => errorHandler(err, req, res));
    })
    .put('/:id', (req, res) => {
        Hero.findByIdAndUpdate(req.params.id, req.body)
            .then(hero => {
                res.json(hero);
            })
            .catch(err => errorHandler(err, req, res));
    })
    .delete('/:id', (req, res) => {
        Hero.findByIdAndRemove(req.params.id)
            .then(removed => res.json({ removed }))
            .catch(err => errorHandler(err, req, res));
    });
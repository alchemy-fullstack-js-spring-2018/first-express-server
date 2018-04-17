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
                res.json(hero);
            });
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
            });
    })
    .delete('/:id', (req, res) => {
        Hero.findByIdAndRemove(req.params.id)
            .then(removed => res.json({ removed }));
    });
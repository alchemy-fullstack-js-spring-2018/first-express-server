const router = require('express').Router();
const Hero = require('../lib/models/model');
const errorHandler = require('../error-handler');

// save, findById, findByIdAndUpdate, findAll, findByIdAndRemove

module.exports = router
    .post('/', (req, res) => {
        Hero.save(req.body)
            .then(hero => res.json(hero));
    })
    .get('/', (req, res) => {
        Hero.find()
            .then(heroes => res.json(heroes))
    });
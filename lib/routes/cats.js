const router = require('express').Router();
const Cat = require('../models/model');
const errorHandler = require('../error-handler');

module.exports = router
    .post('/', (req, res) => {
        Cat.save(req.body)
            .then(cat => res.json(cat))
            .catch(err => errorHandler(err, req, res));
    });
const router = require('express').Router();
const Museum = require('../models/model');
const errorHandler = require('../error-handler');

module.exports = router
    .post('/', (req, res) => {
        Museum.save(req.body)
            .then(museum => res.json(museum))
            .catch(err => errorHandler(err, req, res));
    });
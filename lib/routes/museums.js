const router = require('express').Router();
const Museum = require('../models/model');

module.exports = router
    .post('/', (req, res) => {
        Museum.save(req.body)
            .then(museum => res.json(museum));

    });
const router = require('express').Router();
const Animal = require('../models/Animal');


module.exports = router
    .post('/', (req, res) => {
        Animal.save(req.body)
            .then(animal => {
                res.json([animal]);
            });

    });
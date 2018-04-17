const router = require('express').Router();
const Team = require('../models/model');
const errorHandler = require('../error-handler');


module.exports = router
    .get('/', (req, res) => {
        Team.find()
            .then(teams => res.json(teams))
            .catch(err => errorHandler(err, req, res));
    })

    .post('/', (req, res) => {
        Team.save(req.body)
            .then(team => res.json(team))
            .catch(err => errorHandler(err, res, req));
    });
    
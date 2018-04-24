const router = require('express').Router();
const Team = require('../models/Team');
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
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;
        Team.findById(id)
            .then(team => {
                if(!team){
                    errorHandler({
                        status: 404,
                        error: `No id ${ id }`
                    }, req, res);
                }
                else res.json(team);
            })
            .catch(err => errorHandler(err, res, req));
    });
    
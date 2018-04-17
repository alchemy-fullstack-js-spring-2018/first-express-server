const router = require('express').Router();
const Tea = require('../models/model');
const errorHandler = require('../error-handler');


module.exports = router
    .post('/', (req, res) => {
        Tea.save(req.body)
            .then(tea => res.json(tea));
    })
    
    .get('/:id', (req, res) => {
        const { id } = req.params;
        Tea.findById(id)
            .then(tea => {
                if(!tea){
                    errorHandler({
                        status: 404,
                        error: `No id ${ id }`
                    }, req, res);
                }
                else res.json(tea);
            })
            .catch(err => errorHandler(err, res, req));
    });

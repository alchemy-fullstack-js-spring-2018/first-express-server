const router = require('express').Router();
const Tea = require('../models/model');
const errorHandler = require('../error-handler');


module.exports = router
    .post('/', (req, res) => {
        Tea.save(req.body)
            .then(tea => res.json(tea))
            .catch(err => errorHandler(err, res, req));
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
    })

    .put('/:id', (req, res) => {
        Tea.findByIdAndUpdate(req.params.id, req.body)
            .then(tea => res.json(tea))
            .catch(err => errorHandler(err, req, res));
    })
    
    .get('/', (req, res) => {
        Tea.find()
            .then(teas => res.json(teas))
            .catch(err => errorHandler(err, req, res));
    })
    
    .delete('/:id', (req, res) => {
        Tea.findByIdAndRemove(req.params.id)
            .then(removed => res.json({ removed }))
            .catch(err => errorHandler(err, req, res));
    });

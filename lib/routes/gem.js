const router = require('express').Router();
const Gem = require('../models/gem');
const errHandler = require('../errHandler');

module.exports = router
    .post('/', (req, res) => {
        Gem.save(req.body)
            .then(crystalgem => res.json(crystalgem))
            .catch(err => errHandler(err, req, res));
    })

    .get('/', (req, res) => {
        Gem.find()
            .then(crystalgems => res.json(crystalgems))
            .catch(err => errHandler(err, req, res));
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;
        
        Gem.findById(id)
            .then(crystalgem => {
                if(!crystalgem) {
                    errHandler({
                        status: 404,
                        error: `The Crystal Gem by ${id} has not been found.`
                    }, req, res);
                } else res.json(crystalgem);
            })
            .catch(err => errHandler(err, req, res));
    });

    

            
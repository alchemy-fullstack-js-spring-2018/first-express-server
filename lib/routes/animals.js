const router = require('express').Router();
const Animal = require('../models/animal');
const errorHandler = require('../error-handler');


module.exports = router
    .post('/', (req, res) => {
        Animal.save(req.body)
            .then(animal => {
                res.json(animal)
                    .catch(err => errorHandler(err, req, res));
            });
    })
    
    .get('/', (req, res) => {
        Animal.find()
            .then(animals =>  res.json(animals));
        
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;

        Animal.findById(id)
            .then(animals => {
                if(!animals) {
                    errorHandler({
                        status: 404,
                        error: 'Animal id ${id} does not exist'
                    }, req, res);
                }
                else res.json(animals);
            })
            .catch(err => errorHandler(err, req, res));
    });
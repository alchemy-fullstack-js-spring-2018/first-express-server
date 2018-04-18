//building our  router for our express app.
//routing is just determining how your application responds to a client request.
//it does this by having hard-coded route paths think '/' as a request and responds with a function.
const router = require('express').Router();
const videogames = require('../models/model');
const errorHandler = require('../error-handler');

module.exports = router 

    .post('/', (req, res) => {
        videogames.save(req.body)
            .then(games => res.json(games))
            .catch(err => errorHandler(err, req, res));

    })
    
    .get('/:id', (req, res) => {
        const { id } = req.params;

        videogames.findById(id)
            .then(games => {
                if(!games) {
                    errorHandler({
                        status: 404,
                        error: `videogame id ${id} could not be retrieved`
                    }, req, res);
                }
                else res.json(games);
            })
            .catch(err => errorHandler(err, req, res));
    })

    .get('/', (req, res) => {
        videogames.find()
            .then(games => res.json({ games }))
            .catch(err => errorHandler(err, req, res));
    })

    .put('/:id', (req, res) => {
        videogames.findByIdAndUpdate(req.params.id, req.body)
            .then(games => res.json(games))
            .catch(err => errorHandler(err, req, res));
    })

    .delete('/:id', (req, res) => {
        videogames.findByIdAndRemove(req.params.id)
            .then(removed => res.json({ removed }))
            .catch(err => errorHandler(err, req, res));
    });
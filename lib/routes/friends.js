const router = require('express').Router(); /* eslint-disable-line */
const Friend = require('../models/friend');
const errorHandler = require('../error-handler');

module.exports = router
    .post('/', (req, res) => {
        Friend.save(req.body)
            .then(friend => res.json(friend))
            .catch(err => errorHandler(err, req, res));
    })

    .put('/:id', (req, res) => {
        Friend.findByIdAndUpdate(req.params.id, req.body)
            .then(friend => res.json(friend))
            .catch(err => errorHandler(err, req, res));
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;

        Friend.findById(id)
            .then(friend => {
                if(!friend) {
                    errorHandler({
                        status: 404,
                        error: `Friend id ${id} does not exist!`
                    }, req, res);
                }
                else res.json(friend);
            })
            .catch(err => errorHandler(err, req, res));
    })

    .get('/', (req, res) => {
        Friend.find()
            .then(friends => res.json(friends))
            .catch(err => errorHandler(err, req, res));
    });

// .delete('/:id', (req, res) => {
// });
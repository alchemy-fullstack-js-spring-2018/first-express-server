const router = require('express').Router(); /* eslint-disable-line */
const Friend = require('../models/friend');
const errorHandler = require('../error-handler');

module.exports = router
    .post('/', (req, res) => {
        Friend.save(req.body)
            .then(friend => res.json(friend))
            .catch(err => errorHandler(err, req, res));
    });

// .put('/:id', (req, res) => {        
// })

// .get('/', (req, res) => {
// })    

// .get('/:id', (req, res) => {
// })

// .delete('/:id', (req, res) => {
// });
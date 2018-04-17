const router = require('express').Router();
const Gem = require('../models/gem');
const errHandler = require('../errHandler');

module.exports = router
    .post('/', (req, res) => {
        Gem.save(req.body)
            .then(crystalgem => (res.json(crystalgem))
                .catch(err => errHandler(err, req, res)));
    });

            
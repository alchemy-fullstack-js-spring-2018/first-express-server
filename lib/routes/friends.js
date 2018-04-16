const express = require('express');
const Router = express.Router;
const router = Router();
const friend = require('../models/friend');

module.exports = router

    .post('/:id', (req, res) => {
        friend.save({ name: 'Sam' });
        res.send(`Friend saved!`);
    })

    .get('/', (req, res) => {
        res.json(['sam', 'kasey']);
    })

    .get('/:id', (req, res) => {
        res.json({ _id: req.params.id, name: 'sam' });
    });
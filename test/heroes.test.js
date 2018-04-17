const { assert } = require('chai');
const request = require('./request');
const Hero = require('../lib/models/model');

describe('Overwatch API', () => {

    let genji = {
        name: 'Genji Schimada',
        alias: 'Genji',
        age: 35,
        role: 'Flanker'
    };
    let zen = {
        name: 'Tekhartha Zenyatta',
        alias: 'Zenyatta',
        age: 20,
        role: 'Support'
    };

    it('saves a hero', () => {
        return request.post('/heroes')
            .send(genji)
            .then(({ body }) => {
                console.log(body);
                assert.ok(body._id);
                genji = body;
            });
    });

    it('gets all heroes', () => {
        return request.get('/heroes')
            .then(({ body }) => {
                assert.deepEqual(body, [genji]);
            });
    });

});
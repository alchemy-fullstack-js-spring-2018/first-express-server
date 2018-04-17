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
                assert.ok(body._id);
                genji = body;
            });
    });
    it('gets by id', () => {
        return Hero.save(zen)
            .then(saved => {
                zen = saved;
                return request.get(`/heroes/${zen._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, zen);
            });
    });

    it('gets all heroes', () => {
        return request.get('/heroes')
            .then(({ body }) => {
                assert.deepEqual(body, [genji, zen]);
            });
    });

    it('updates a hero', () => {
        zen.role = 'DPS Support';

        return request.put(`/heroes/${zen._id}`)
            .send(zen)
            .then(({ body }) => {
                assert.deepEqual(body, zen);
                return Hero.findById(zen._id);
            })
            .then(updated => {
                assert.deepEqual(updated, zen);
            });
    });

});
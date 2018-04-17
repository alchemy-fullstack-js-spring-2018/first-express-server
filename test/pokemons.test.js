const { assert } = require('chai');
const request = require('./request');
const Pokemon = require('../lib/models/pokemon');

describe('Pokemen', () => {

    let bulb = {
        name: 'Bulbasaur',
        type: 'Grass'
    };

    let char = {
        name: 'Charmander',
        type: 'Fire'
    };

    let squirt = {
        name: 'Squirtle',
        type: 'Water'
    };

    it('saves a pokeman', () => {
        return request
            .post('/pokemons')
            .send(bulb)
            .then(({ body }) => {
                const { _id } = body;
                assert.ok(_id);
                assert.deepEqual(body, { _id, ...bulb });
                bulb = body;
                return _id;
            })
            .then(_id => Pokemon.findById(_id))
            .then(found => {
                assert.deepEqual(found, bulb);
            });
    });

    it('saves another pokeman', () => {
        return request
            .post('/pokemons')
            .send(char)
            .then(({ body }) => {
                const { _id } = body;
                assert.ok(_id);
                assert.deepEqual(body, { _id, ...char });
                char = body;
                return _id;
            })
            .then(_id => Pokemon.findById(_id))
            .then(found => {
                assert.deepEqual(found, char);
            });
    });

    it('updates a pokemon by id', () => {
        char.type = 'FIRE';

        return request
            .put(`/pokemons/${char._id}`)
            .send(char)
            .then(({ body }) => {
                assert.deepEqual(body, char);
            });
    });

    it('gets a pokeman by id', () => {
        return Pokemon.save(squirt)
            .then(saved => {
                squirt = saved; 
                return request.get(`/pokemons/${squirt._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, squirt);
            });
    });

    it('gets all pokemen', () => {
        return request
            .get('/pokemons')
            .then(({ body }) => {
                assert.deepEqual(body, [bulb, char, squirt]);
            });
    });

    it('deletes a pokemon by id', () => {
        return request  
            .del(`/pokemons/${squirt._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, { removed: true });
                return Pokemon.findById(squirt._id);
            })
            .then(deleted => {
                assert.isUndefined(deleted);
            });
    });

    it('returns 404 on no id', () => {
        return request
            .get(`/pokemons/${squirt._id}`)
            .then(response => {
                assert.equal(response.status, 404);
                assert.ok(response.body.error);
            });
    });

});
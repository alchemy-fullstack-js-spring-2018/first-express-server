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

});
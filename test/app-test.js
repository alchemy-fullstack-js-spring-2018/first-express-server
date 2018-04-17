const { assert } = require('chai');
const Gems = require('../lib/models/gem');
const request = require('./request');

describe('E2E Gems', () => {

    let garnet = {
        name: 'Garnet',
        type: 'Fusion',
        weapon: 'Gauntlets'
    };

    let pearl = {
        name: 'Pearl',
        type: 'Organic',
        weapon: 'Spear'
    };

    it('saves a Crystal Gem', () => {
        return request.post('/gems')
            .send(garnet)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.deepEqual(body, { _id: body._id, ...garnet });
                garnet = body;
            });
    });

    it('gets all Crystal Gems', () => {
        return request.post('/gems')
            .send(pearl)
            .then(({ body }) => {
                pearl = body;
                return request.get('/gems');
            })
            .then(({ body }) => {
                assert.deepEqual(body, [garnet, pearl]);
            });
    });

    it('gets a Crystal Gem by id', () => {
        return request.get(`/gems/${pearl._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, pearl);
            });
    });

    it('updates a diamond', () => {
        pearl.type = 'Renegade Servant';

        return request.put(`/gems/${pearl._id}`)
            .send(pearl)
            .then(({ body }) => {
                assert.deepEqual(body, pearl);
                return Gems.findById(pearl._id);
            })
            .then(updated => {
                assert.deepEqual(updated, pearl);
            });
    });


});
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
            });
    });

    it('gets a Crystal Gem by id', () => {
        return Gems.save(pearl)
            .then(saved => {
                pearl = saved;
                return request.get(`/gems/${pearl._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, garnet);
            });
    });

    it('gets all Crystal Gems', () => {
        return request.get('/gems')
            .then(({ body }) => {
                assert.deepEqual(body, [pearl, pearl]);
            });
    });


});
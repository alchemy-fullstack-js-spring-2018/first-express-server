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
                assert.equal(body, { _id: body._id, ...pearl });
            });
    });


});
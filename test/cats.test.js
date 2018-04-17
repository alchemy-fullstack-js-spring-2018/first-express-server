const { assert } = require('chai');
const request = require('./request');
const Cat = require('../lib/models/model');

describe('Cat API', () => {

    const snowLeopard = {
        commonName: 'snow leopard',
        scientificName: 'Panthera uncia'
    };

    it('saves and gets a cat', () => {
        return Cat.save(snowLeopard)
            .then(saved => {
                assert.deepEqual(saved, { _id: saved._id, ...snowLeopard });
            });
    });
});
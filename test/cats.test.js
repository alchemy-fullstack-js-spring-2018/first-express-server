const { assert } = require('chai');
const request = require('./request');
const Cat = require('../lib/models/model');

describe('Cat API', () => {

    let snowLeopard = {
        commonName: 'snow leopard',
        scientificName: 'Panthera uncia'
    };

    it('saves a cat (POST)', () => {
        return request.post('/cats')
            .send(snowLeopard)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.deepEqual(body, { _id: body._id, ...snowLeopard });
                snowLeopard = body;
            });
    });
});
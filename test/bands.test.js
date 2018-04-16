const { assert } = require('chai');
const request = require('./request');
const Band = require('../lib/models/model');

describe('Band API', () => {

    let band1 = {
        name: 'Preoccupations',
        city: 'Calgary'
    };

    let band2 = {
        name: 'Shame',
        city: 'London'
    };

    it('POST - saves a band', () => {
        return request.post('/bands')
            .send(band1)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.deepEqual(body, { _id: body._id, ...band1 });
                band1 = body;
            });
    });

    it('GET - a band by ID', () => {
        return Band.save(band2)
            .then(saved => {
                band2 = saved;
                return request.get(`/bands/${band2._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, band2);
            });
    });

});
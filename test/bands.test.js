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

    it('PUT - update a band', () => {
        band1.city = 'Calgary, Canada';

        return request.put(`/bands/${band1._id}`)
            .send(band1)
            .then(({ body }) => {
                assert.deepEqual(body, band1);
                return Band.findById(band1._id);
            })
            .then(updated => {
                assert.deepEqual(updated, band1);
            });
    });

    it('GET - all bands', () => {
        return request.get('/bands')
            .then(({ body }) => {
                assert.deepEqual(body, [band1, band2]);
            });
    });
    
    it('DELETE - band by ID', () => {
        return request.delete(`/bands/${band1._id}`)
            .then(() => {
                return Band.findById(band1._id);
            })
            .then(found => {
                assert.isUndefined(found);
            });
    });

    it('GET 404 - by ID', () => {
        return request.get(`/bands/${band1._id}`)
            .then(response => {
                assert.equal(response.status, 404);
                assert.match(response.body.error, /^Band id/);
            });
    });

});
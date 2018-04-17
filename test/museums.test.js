const { assert } = require('chai');
const request = require('./request');
const Museum = require('../lib/models/model');

describe('Museum API', () => {
    
    let smithsonian = {
        name: 'Smithsonian',
        location: 'Washington, DC'
    };

    let met = {
        name: 'Metropolitan Museum of Art',
        location: 'New York City, NY'
    };

    it('saves a museum', () => {
        return request.post('/museums')
            .send(smithsonian)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.deepEqual(body, { _id: body._id, ...smithsonian });
                smithsonian = body;
            });
    });

    it('gets a museum by id', () => {
        return Museum.save(met)
            .then(saved => {
                met = saved;
                return request.get(`/museums/${met._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, met);
            });
    });

    it('gets all museums', () => {
        return request.get('/museums')
            .then(({ body }) => {
                assert.deepEqual(body, [smithsonian, met]);
            });
    });

    it('deletes a museum by id', () => {
        return request.delete(`/museums/${met._id}`)
            .then(() => {
                return Museum.findById(met._id);
            })
            .then(response => {
                assert.isUndefined(response);
            });
    });

    it('updates a museum', () => {
        smithsonian.fee = '$25.00';
        return request.put(`/museums/${smithsonian._id}`)
            .send(smithsonian)
            .then(({ body }) => {
                assert.deepEqual(body, smithsonian);
                return Museum.findById(smithsonian._id);
            })
            .then(updated => {
                assert.deepEqual(updated, smithsonian);
            });
    });

    it('return a 404 status if id not found', () => {
        return request.get(`/museums/${met._id}`)
            .then(response => {
                assert.equal(response.status, 404);
                assert.match(response.body.error, /^Museum with/);
            });
    });
});
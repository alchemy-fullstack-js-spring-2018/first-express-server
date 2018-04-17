const { assert } = require('chai');
const request = require('./request');
const Tea = require('../lib/models/model');

describe('tea', () => {

    let earlGrey = {
        name: 'Earl Grey',
        type: 'black',
        good: true
    };

    let greenTea = {
        name: 'Green tea',
        type: 'green',
        good: false
    };

    it('saves a tea', () => {
        return request.post('/teas')
            .send(earlGrey)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.deepEqual(body, { _id: body._id, ...earlGrey });
                earlGrey = body;
            });
    });

    it('gets tea by id', () => {
        return Tea.save(greenTea)
            .then(saved => {
                greenTea = saved;
                return request.get(`/teas/${greenTea._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, greenTea);
            });
    });

    it('updates tea', () => {
        greenTea.recommended = 'no';

        return request.put(`/teas/${greenTea._id}`)
            .send(greenTea)
            .then(({ body }) => {
                assert.deepEqual(body, greenTea);
                return Tea.findById(greenTea._id);
            })
            .then(updated => {
                assert.deepEqual(updated, greenTea);
            });
    });

    it('gets all teas', () => {
        return request.get('/teas')
            .then(({ body }) => {
                assert.deepEqual(body, [earlGrey, greenTea]);
            });
    });

    it('deletes a tea by id', () => {
        return request.delete(`/teas/${greenTea._id}`)
            .then(() => {
                return Tea.findById(greenTea._id);
            })
            .then(found => {
                assert.isUndefined(found);
            });
    });

    it('returns 404 on request with no id', () => {
        return request.get(`/teas/${greenTea._id}`)
            .then(response => {
                assert.equal(response.status, 404);
                assert.match(response.body.error, /No id/);
            });
    });
});
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

    // let data = {};

    // it('saves & gets tea', () => {
    //     return Tea.save(data)
    //         .then(saved => {
    //             assert.ok(saved._id);
    //         });
    // });

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
});
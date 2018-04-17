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
    let harvard = {
        name: 'Harvard Museum of Natural History',
        location: 'Boston, MA'
    };

    // it('saves and gets a museum', () => {
    //     return Museum.save(smithsonian)
    //         .then(saved => {
    //             assert.deepEqual(saved, { _id: saved._id, ...smithsonian })
    //         });
    // });

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
        return request.delete(`/pirates/${met._id}`)
            .then(() => {
                return Museum.findById(met._id);
            })
            .then(response => {
                assert.isUndefined(response);
            });
    });
});
const { assert } = require('chai');
const request = require('./request');
const Pet = require('../lib/models/model');

describe('pets API', () => {

    // let tigerShark = {
    //     name: 'tiger',
    //     size: 'decent',
    // };

    let rhino = {
        name: 'rhinocerus',
        size: 'big'
    };

    it('posts pet', () => {
        return request
            .post('/pets')
            .send(rhino)
            .then(({ body }) => {
                const { _id } = body;
                assert.ok(_id);
                assert.deepEqual(body, { _id, ...rhino });
                rhino = body;
                return _id;
            })
            .then(_id => Pet.findById(_id))
            .then(found => {
                assert.deepEqual(found, rhino);
            });
    });

    it('gets all pets', () => {
        return request
            .get('/pets')
            .then(({ body }) => {
                assert.deepEqual(body, [rhino]);
            });
    });

});
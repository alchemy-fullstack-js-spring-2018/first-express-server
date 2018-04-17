const { assert } = require('chai');
const request = require('/request');
//const animals = require('../lib/animals');



describe('animals', () => {

    /*let max = {
        name: 'Max',
        type: 'lion'
    };*/

    let snappy = {
        name: 'Snappy',
        type: 'alligator'
    };

    it('saves an animal', () => {
        return request.post('/animals')
            .send(snappy)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.deepEqual(body, { _id: body._id, snappy });
                snappy = body;
            });
    });
});
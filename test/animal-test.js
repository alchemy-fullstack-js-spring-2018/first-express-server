const { assert } = require('chai');
const request = require('./request');
//const animal = require('../lib/models/animal');
//const animals = require('../routes/animals');



describe('Animals API', () => {

    let max = {
        name: 'Max',
        type: 'lion'
    };

    /*let snappy = {
        name: 'Snappy',
        type: 'alligator'
    };*/

    it('saves an animal', () => {
        return request.post('/animal')
            .send(max)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.deepEqual(body, { _id: body._id, ...max });
                max = body;
            });
    });
});
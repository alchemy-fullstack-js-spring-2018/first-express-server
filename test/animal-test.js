const { assert } = require('chai');
const request = require('/request');
//const Animal = require('../lib/models/animal');



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
        return request.post('/animals')
            .send(max)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.deepEqual(body, { _id: body._id, ...max });
                max = body;
            });
    });
});
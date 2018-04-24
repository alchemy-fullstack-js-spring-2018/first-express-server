const { assert } = require('chai');
const request = require('./request');
const Animal = require('../lib/models/animal');
//const animals = require('../routes/animals');



describe('Animals API', () => {

    let max = {
        name: 'Max',
        type: 'lion'
    };

    let snappy = {
        name: 'Snappy',
        type: 'alligator'
    };

    it('saves an animal', () => {
        return request.post('/animal')
            .send(max)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.deepEqual(body, { _id: body._id, ...max });
                max = body;
            });
    });

    it('gets all animals', ()=> {
        return Animal.save(max)
            .then(saved => {
                max = saved;
                return request.get('/animals');
            })
            .then(({ body }) => {
                assert.deepEqual(body, [max, snappy]);
            });
    });

});
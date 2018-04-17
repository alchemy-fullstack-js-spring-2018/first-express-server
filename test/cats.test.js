const { assert } = require('chai');
const request = require('./request');
const Cat = require('../lib/models/model');

describe('Cat API', () => {

    let snowLeopard = {
        commonName: 'snow leopard',
        scientificName: 'Panthera uncia'
    };

    let cheetah = {
        commonName: 'cheetah',
        scientificName: 'Acinonyx jubatus'
    };

    it('saves a cat (POST)', () => {
        return request.post('/cats')
            .send(snowLeopard)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.deepEqual(body, { _id: body._id, ...snowLeopard });
                snowLeopard = body;
            });
    });

    it('gets all cats (GET)', () => {
        return Cat.save(cheetah)
            .then(saved => {
                cheetah = saved;
                return request.get('/cats');
            })
            .then(({ body }) => {
                assert.deepEqual(body, [snowLeopard, cheetah]);
            });
    });

    it('gets a cat by id (GET)', () => {
        return request.get(`/cats/${cheetah._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, cheetah);
            });
    });
});
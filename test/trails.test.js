const { assert } = require('chai');
const request = require('./request');
const Trail = require('../lib/models/trail');

describe('Trails API', () => {
    let pct = {
        name: 'Pacific Crest Trail',
        length: 2650
    };

    let at = {
        name: 'Appalachian Trail',
        length: 2181
    };

    let cdt = {
        name: 'CDT',
        length: 3100
    };

    it('saves a trail', () => {
        return request.post('/trails')
            .send(pct)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.deepEqual(body, { _id: body._id, ...pct });
                pct = body;
            });
    });

    it('get trail by id', () => {
        return Trail.save(at)
            .then(saved => {
                at = saved;
                return request.get(`/trails/${at._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, at);
            });
    });

    it('get all trails', () => {
        return Trail.save(cdt)
            .then(saved => {
                cdt = saved;
                return request.get('/trails');
            })
            .then(({ body }) => {
                assert.deepEqual(body, [pct, at, cdt]);
            });
    });

    it('update trail by id', () => {
        cdt.name = 'Continental Divide Trail';
        return request.put(`/trails/${cdt._id}`)
            .send(cdt)
            .then(({ body }) => {
                assert.deepEqual(body, cdt);
            });
    });

    it('delete trail by id', () => {
        return request.del(`/trails/${cdt._id}`)
            .then(() => {
                return Trail.findById(`/trails/${cdt._id}`);
            })
            .then(found => {
                assert.isUndefined(found);
            });
    });
});
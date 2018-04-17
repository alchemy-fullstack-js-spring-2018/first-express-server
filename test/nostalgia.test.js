const { assert } = require('chai');
const request = require('./request');
const Nostalgia = require('../lib/models/model');


describe('Nostalgia API', ()=> {

    let destiny = {
        band: `Destiny's Child`,
        type:  `Girl group`,
        hit: 'Bills Bills Bills'
    };

    let tlc = {
        band: 'TLC',
        type: 'Girl group',
        hit: 'No Scrubs'
    };

    it('saves a band', () => {
        return request.post('/nostalgia')
            .send(destiny)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.deepEqual(body, { _id: body._id, ...destiny });
                destiny = body;
            });
    });

    it('gets band by id', () => {
        return Nostalgia.save(tlc)
            .then(band => {
                tlc = band;
                return request.get(`/nostalgia/${tlc._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, tlc);
            });
    });

    it('update a pirate', () => {
        destiny.hit = 'Say My Name';

        return request.put(`/nostalgia/${destiny._id}`)
            .send(destiny)
            .then(({ body }) => {
                assert.deepEqual(body, destiny);
                return Nostalgia.findById(destiny._id);
            })
            .then(updated => {
                assert.deepEqual(updated, destiny);
            });
    });

    it.skip('gets all bands', () => {
        return request.get('/nostalgia')
            .then(({ body }) => {
                assert.deepInclude(body, destiny);
                assert.deepInclude(body, tlc);
            });
    });

    it('deletes a band', () => {
        return request.delete(`/nostalgia/${tlc._id}`)
            .then(() => {
                return Nostalgia.findById(tlc._id);
            })
            .then(found => {
                assert.isUndefined(found);
            });
    });

    it('returns 404 on a bad id', () => {
        return request.get(`/nostalgia/${tlc._id}`)
            .then(response => {
                assert.equal(response.status, 404);
            });
    });
});
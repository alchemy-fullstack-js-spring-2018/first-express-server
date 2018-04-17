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
});
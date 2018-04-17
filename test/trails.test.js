const { assert } = require('chai');
const request = require('./request');
// const trail = require('../lib/models/trail');

describe('Trails API', () => {
    let pct = {
        name: 'Pacific Crest Trail',
        length: 2650
    };

    // let at = {
    //     name: 'Appalachian Trail',
    //     length: 2181
    // };

    // let cdt = {
    //     name: 'Continental Divide Trail',
    //     length: 3100
    // };

    it('saves a trail', () => {
        return request.post('/trails')
            .send(pct)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.deepEqual(body, { _id: body._id, ...pct });
                pct = body;
            });
    });
});
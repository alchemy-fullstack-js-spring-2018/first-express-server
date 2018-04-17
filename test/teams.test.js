const { assert } = require('chai');
const request = require('./request');
// const Team = require('../lib/models/model');

describe('team', () => {

    // let Seahawks = {
    //     name: 'Seattle Seahawks',
    //     division: 'NFC west',
    //     winning: true
    // };

    // let Rams = {
    //     name: 'LA Rams',
    //     division: 'NFC west',
    //     winning: true
    // };

    let Cardinals = {
        name: 'Arizona Cardinals',
        division: 'NFC west',
        winning: null
    };

    
    it('saves a team', () => {
        return request.post('/teams')
            .send(Cardinals)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.deepEqual(body, { _id: body._id, ...Cardinals });
                Cardinals = body;
            });
    });
    
    it('gets all teams', () => {
        return request.get('/teams')
            .then(({ body }) => {
                assert.deepEqual(body, [Cardinals]);
            });
    });
});
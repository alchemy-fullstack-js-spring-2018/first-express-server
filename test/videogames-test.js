const { assert } = require('chai'); //requring chai's assertion library.
const request = require('./request'); //calls on our request file to create an express server.
const videogames = require('../lib/models/model');

describe('Videogame API', () => {

    let armello = {
        name: 'Armello',
        developer: 'League of Geeks',
        gametype: 'Digital boardgame'
    };

    let undertale = {
        name: 'Undertale',
        develoepr: 'Toby Fox',
        gametype: 'indie'
    };


    it('runs a test', () =>{ //double check everythings talking,
        assert.ok(true);

    });

    it('saves a game', () => {
        return request.post('/videogames')
            .send(armello)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.deepEqual(body, { _id: body._id, ...armello });
                armello = body;
            });
    });


});
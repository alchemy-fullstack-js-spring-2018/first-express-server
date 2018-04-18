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
        developer: 'Toby Fox',
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

    it('gets game by its id', () => {
        return videogames.save(undertale)
            .then(body => {
                undertale = body;
                return request.get(`/videogames/${undertale._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, undertale);
            });
    });

    it('update a game', () => {
        armello.name = 'Settlers of Catan';

        return request.put(`/videogames/${armello._id}`)
            .send(armello)
            .then(({ body }) => {
                assert.deepEqual(body, armello);
                return videogames.findById(armello._id);
            })
            .then(updated => {
                assert.deepEqual(updated, armello);
            });
    });

    it('Gets all games', () => {
        return request.get('/videogames')
            .then(({ body }) => {
                assert.deepEqual(body, { games: [armello, undertale] });
            });
    });

    it('deletes a game', () => {
        return request.delete(`/videogames/${undertale._id}`)
            .then(() => {
                return videogames.findById(undertale._id);
            })
            .then(found => {
                assert.isUndefined(found);
            });
    });

    it('returns 404 on a missing id', () => {
        return request.get(`/videogames/${undertale._id}`)
            .then(response => {
                assert.equal(response.status, 404);
            }); 
    });

});
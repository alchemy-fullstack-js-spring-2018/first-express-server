const { assert } = require('chai');
const request = require('./request');
const Friend = require('../lib/models/friend');

describe('Friends Express server', () => {
    let sam = {
        name: 'Sam',
        weaponOfChoice: 'Literally anything',
        catchphrase: 'When reason fails, force prevails'
    };

    let kasey = {
        name: 'Kasey T. Whiler',
        weaponOfChoice: 'Projectiles',
        catchphrase: '*censored*'
    };

    it('Saves a new friend', () => {
        return request.post('/friends')
            .send(kasey)
            .then(( { body }) => {
                assert.ok(body._id);
                assert.deepEqual(body, { _id: body._id, ...kasey });
                kasey = body;
            });
    });

    it('Gets a friend by ID', () => {
        return Friend.save(sam)
            .then(saved => {
                sam = saved;
                return request.get(`/friends/${sam._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, sam);
            });
    });

    it('Updates a friend', () => {
        sam.son = 'Thomas';

        return request.put(`/friends/${sam._id}`)
            .send(sam)
            .then(({ body }) => {
                assert.deepEqual(body, sam);
                return Friend.findById(sam._id);
            })
            .then(updated => {
                assert.deepEqual(updated, sam);
            });
    });

    it('Gets all friends', () => {
        return request.get('/friends')
            .then(({ body }) => {
                assert.deepEqual(body, [kasey, sam]);
            });
    });
});
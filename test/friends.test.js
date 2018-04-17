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
            .send(sam)
            .then(( { body }) => {
                assert.ok(body._id);
                console.log(body);
                assert.deepEqual(body, { _id: body._id, ...sam });
                sam = body;
            });
    });
});
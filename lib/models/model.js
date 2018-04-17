// const shortid = require('shortid');
const store = new Map();

module.exports = {

    find() {
        return Promise.resolve([...store.values()]);
    },
};

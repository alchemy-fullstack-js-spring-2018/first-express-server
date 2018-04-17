const shortid = require('shortid');
const store = new Map();

module.exports = {
    
    save(pokemon) {
        return this.findByIdAndUpdate(shortid(), pokemon);
    },

    findByIdAndUpdate(id, pokemon) {
        const dbCopy = { ...pokemon, _id: id };
        store.set(id, dbCopy);
        return Promise.resolve(dbCopy);
    },

    findById(id) {
        return Promise.resolve(store.get(id));
    },

    find() {
        return Promise.resolve([...store.values()]);
    },

    findByIdAndRemove(id) {
        const exists = store.has(id);
        store.delete(id);
        return Promise.resolve(exists);
    }
};
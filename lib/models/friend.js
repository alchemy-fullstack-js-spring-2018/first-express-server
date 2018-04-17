const shortid = require('shortid');
const store = new Map();

module.exports = {
    
    save(model) {
        return this.findByIdAndUpdate(shortid(), model);
    },

    find() {
        return Promise.resolve([...store.values()]);
    },

    findById(id) {
        return Promise.resolve(store.get(id));
    },

    findByIdAndUpdate(id, model) {
        const dbCopy = { ...model, _id: id };
        store.set(id, dbCopy);
        return Promise.resolve(dbCopy);
    },

    findByIdAndRemove(id) {
        const exists = store.has(id);
        store.delete(id);
        return Promise.resolve(exists);
    }
};

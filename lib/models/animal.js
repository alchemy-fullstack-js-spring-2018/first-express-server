const shortid = require('shortid');
const store = new Map();
//const animals = require('../routes/animals');


module.exports = {
    
    save(model) {
        return this.findByIdAndUpdate(shortid(), model);
    },

    findByIdAndUpdate(id, model) {
        const dbCopy = { ...model, _id: id };
        store.set(id, dbCopy);
        return Promise.resolve(store.get(id));
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
const shortid = require('shortid');
//const store = new Map();

module.exports = {
    
    save(model) {
        /*let max = {
            name: 'Max',
            type: 'lion'
        };*/
        return this.findByIdAndUpdate(shortid(), model);
    },
};

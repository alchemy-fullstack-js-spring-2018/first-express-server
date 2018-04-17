const express = require('express');
const app = express();
const animals = require('./animals');

app.use(express.static());
app.use(express.json());
app.use('/animals', animals);

//const animals = require('/.routes/animals');??

/*app.get('/animals', (req, res) => {
    //console.log(req.query);
    res.json([
        { name: 'max', type: 'lion' },
        { name: 'snappy', type: 'alligator' },
    ]);

});
app.get('/animals/:id', (req, res) => {
    //console.log(req.params);
    res.json([
        { name: 'max', type: 'lion' }
    ]);

});
app.post('/animals', (reg, res) => {
    res.json({
        name: 'saved animal name',
        type: 'saved type'
    });
});*/


app.listen(3000);
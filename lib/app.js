const express = require('express');
const app = express();

app.get('/animals', (req, res) => {
    const id = req.params;
    //console.log(id);
    res.json([
        { name: 'max', type: 'lion' },
        { name: 'snappy', type: 'alligator' },
    ]);

});
app.get('/animals/:id', (req, res) => {
    res.json([
        { name: 'max', type: 'lion' },
        { name: 'snappy', type: 'alligator' },
    ]);

});
app.post('/animals', (reg, res) => {
    res.json({
        name: 'saved animal name',
        type: 'saved type'
    });
});


app.listen(3000);
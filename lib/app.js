const express = require('express');
const app = express();

app.get('/animals', (req, res) => {
    res.send('get animals');

});

app.post('/animals', (reg, res) => {
    res.send('post animals');

});

app.listen(3000);


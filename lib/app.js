const express = require('express');
const app = express();
const path = require('path');
const friends = require('./routes/friends');

const publicDir = path.resolve(__dirname, '../public');

app.use(express.static(publicDir));

app.use(express.json());

app.use('/friends', friends);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
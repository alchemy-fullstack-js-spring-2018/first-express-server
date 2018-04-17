const express = require('express');
const app = express();
const gems = require('./routes/gems');

app.use(express.json());

app.use('/gems', gems);

app.listen(3000);
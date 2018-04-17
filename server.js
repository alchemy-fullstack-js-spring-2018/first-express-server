const http = require('http');
const app = require('./lib/app');

const PORT = process.env.PORT || 3000;

const server = http.creatServer(app);

server.listen(PORT, () => {
    console.log('I am running fuckity fuck.');
});
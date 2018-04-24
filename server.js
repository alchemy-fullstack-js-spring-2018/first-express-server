const http = require('http');
const app = require('.lib/app');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);


server.listen(PORT, () => {
// console.log('server hears you', server.address().port());
});
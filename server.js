const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    console.log('Request heard!');
});

server.listen(PORT, () => {
    console.log('server started on port', server.address().port); // eslint-disable-line
});
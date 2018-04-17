const chai = require('chai'); //our assertion library
const chaiHttp = require('chai-http'); //testing interface using superagent(test for asrychronicity);
chai.use(chaiHttp); //tells chai to use chaiHttp.
const http = require('http'); //lets us use node's http server module.

const app = require('../lib/routes/app');

const server = http.createServer(app); //create a server using express, 
//in our app we are calling the module to parse our data. 

const request = chai.request(server).keepOpen();

after(() => server.close());

module.exports = request; //this module lets us create a server for our database to be called.
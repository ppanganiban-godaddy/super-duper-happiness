const getJwt = require('./cert-jwt')();
const output = require('./output');

getJwt.then(output);

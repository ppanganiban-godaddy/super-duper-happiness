const { Agent } = require('https');
const { readFileSync } = require('fs');
const args = require('./args');

const {
  cert = 'confabulator.int'
} = args;

const CERT_PATH = ({
  dev: `./certs/${cert}.dev-godaddy.com.crt`,
  test: `./certs/${cert}.test-godaddy.com.crt`,
  prod: `./certs/${cert}.godaddy.com.crt`
})[process.env.NODE_ENV || 'dev'];

const KEY_PATH = ({
  dev: `./certs/${cert}.dev-godaddy.com.key`,
  test: `./certs/${cert}.test-godaddy.com.key`,
  prod: `./certs/${cert}.godaddy.com.key`
})[process.env.NODE_ENV || 'dev'];

module.exports = () => new Agent({
  cert: readFileSync(CERT_PATH),
  key: readFileSync(KEY_PATH)
});

module.exports.CERT_PATH = CERT_PATH;
module.exports.KEY_PATH = KEY_PATH;

const fetch = require('node-fetch');
const args = require('./args');
const { CERT_PATH, KEY_PATH } = require('./cert-agent');
const output = require('./output');
const agent = require('./cert-agent')();

const BASE_URL = ({
  dev: 'https://commgateway.apiproxy.dev.ext.godaddy.com',
  test: 'https://commgateway.apiproxy.test.ext.godaddy.com',
  prod: 'https://commgateway-phx3.apiproxy.secureserver.net'
})[process.env.NODE_ENV || 'dev'];

const {
  clock = 1,
  limit = 1
} = args;

const url = `${BASE_URL}/Subscription/v2/subscriptions/journal?limit=${limit}&clock=${clock}`;
console.log(`curl "${url}" --cert ${CERT_PATH} --key ${KEY_PATH}`);
fetch(url, { agent })
  .then(data => data.json())
  .then(output);

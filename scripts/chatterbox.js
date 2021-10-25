const fetch = require('node-fetch');
const args = require('./args');
const { CERT_PATH, KEY_PATH } = require('./cert-agent');
const output = require('./output');
const getJwt = require('./cert-jwt')();

const BASE_URL = ({
  devprivate: 'https://pr.usi-ss-chatterbox.int.dev-godaddy.com',
  dev: 'https://usi-ss-chatterbox.int.dev-godaddy.com',
  test: 'https://usi-ss-chatterbox.int.test-godaddy.com',
  prod: 'https://usi-ss-chatterbox.int.godaddy.com'
})[process.env.NODE_ENV || 'devprivate'];

const {
  file = '../data/chatterbox.json'
} = args;

const url = `${BASE_URL}/notification`;
getJwt.then(jwt => {
  console.log(`curl "${url}" -H "Authorization: sso-jwt ${jwt}"`);
  const body = require(file);
  fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `sso-jwt ${jwt}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then(data => data.json())
  .then(output);
});

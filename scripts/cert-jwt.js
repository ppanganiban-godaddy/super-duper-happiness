const fetch = require('node-fetch');
const agent = require('./cert-agent')();
const output = require('./output');
const { CERT_PATH, KEY_PATH } = require('./cert-agent');

const URL = ({
  dev: 'https://sso.dev-godaddy.com/v1/secure/api/token',
  test: 'https://sso.test-godaddy.com/v1/secure/api/token',
  prod: 'https://sso.godaddy.com/v1/secure/api/token',
})[process.env.NODE_ENV || 'dev']

module.exports = () => {
  console.log(`curl -XPOST "${URL}" --data realm=cert --cert ${CERT_PATH} --key ${KEY_PATH}`);
  return fetch(URL, {
    agent,
    body: JSON.stringify({ realm: 'cert' }),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  }).then(data => data.json()).then(jwt => jwt.data);
};

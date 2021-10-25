const fetch = require('node-fetch');
const args = require('./args');
const getJwt = require('./cert-jwt')();
const output = require('./output');

const DEFAULT_SHOPPER_ID = ({
  dev: '1481704',
  test: '2313566',
  prod: 'in3'
})[process.env.NODE_ENV || 'dev'];

const BASE_URL = ({
  dev: 'https://shopper.api.int.dev-godaddy.com',
  test: 'https://shopper.api.int.test-godaddy.com',
  prod: 'https://shopper.api.int.godaddy.com'
})[process.env.NODE_ENV || 'dev'];

const {
  shopper: shopperId = DEFAULT_SHOPPER_ID
} = args;

const url = `${BASE_URL}/v1/shoppers/${shopperId}?auditClientIp=::1&includes=customerId,contact,preference`;
getJwt.then(jwt => {
  console.log(`curl "${url}" -H "Authorization: sso-jwt ${jwt}"`);
  fetch(url, {
    headers: { Authorization: `sso-jwt ${jwt}` }
  }).then(data => data.json()).then(output);
});

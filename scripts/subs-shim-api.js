const fetch = require('node-fetch');
const args = require('./args');
const getJwt = require('./cert-jwt')();
const output = require('./output');

const DEFAULT_CUSTOMER_ID = ({
  dev: '88cc4808-5949-46f9-b333-cdc3e055a67d',
  test: '97a75fea-700a-45cd-8baf-384c7c276646',
  prod: 'caabc35d-8ab2-407f-a6b4-8a13bc936b71'
})[process.env.NODE_ENV || 'dev'];

const BASE_URL = ({
  dev: 'https://subscriptions-shim-ext-ro.cp.api.dp.godaddy.com',
  test: 'https://subscriptions-shim-ext-ro.cp.api.test.godaddy.com',
  prod: 'https://subscriptions-shim-ext-ro.cp.api.prod.godaddy.com',
  // prod: 'https://subscriptions-shim-service.cp.api.int.godaddy.com'
})[process.env.NODE_ENV || 'dev'];

const {
  customerId = DEFAULT_CUSTOMER_ID,
  limit = 250,
  subscriptionId
} = args;

const url = `${BASE_URL}/v2/customers/${customerId}/subscriptions${subscriptionId?`/${subscriptionId}`:`?limit=${limit}&offset=0&marketId=en-us`}`;
// const url = 'https://subscriptions-shim-ext-ro.cp.api.test.godaddy.com/v2/customers/c9ba403f-90d9-4d06-9f5c-cca79df1d582/subscriptions/domainBilling%3A13315838';
getJwt.then(jwt => {
  console.log(`curl "${url}" -H "Authorization: sso-jwt ${jwt}"`);
  fetch(url, {
    headers: { Authorization: `sso-jwt ${jwt}` }
  }).then(data => data.json()).then(output);
});

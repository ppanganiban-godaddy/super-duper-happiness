you'll need to download the certs yourself

put them into /certs folder

i usually used:
```
confabulator.int.godaddy.com
dashboard.api.client.int.godaddy.com
pg.api.client.int.godaddy.com
```

sample commands:
```
node scripts/shopper-api.js --shopper=1481704
```

```
node scripts/subs-shim-api.js --customerId=88cc4808-5949-46f9-b333-cdc3e055a67d --subscriptionId=wsb:12345
```

```
node scripts/ces-journal-api.js --clock=1
```

```
# need to create a /data folder w chatterbox notifications
node scripts/chatterbox.js --file="../data/chatterbox.json"
```

```
# different env
NODE_ENV=prod node scripts/ces-journal-api.js --clock=1
```

```
# copy results to clipboard
node scripts/subs-shim-api.js --customerId=88cc4808-5949-46f9-b333-cdc3e055a67d --copy=1
```

```
# use a different cert jwt
node scripts/chatterbox.js --cert=dashboard.api.client.int
```

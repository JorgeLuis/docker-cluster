const redis = require('redis');
const {promisify} = require('util');
const client = redis.createClient({
    host: 'redis-server',
    port: 6379
});


module.exports = {
  ...client,
  getAsync: promisify(client.get).bind(client),
  setAsync: promisify(client.set).bind(client),
  keysAsync: promisify(client.keys).bind(client)
};
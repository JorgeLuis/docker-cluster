// Get dependencies
const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
const apiMongo = require('./routes/mongo-route');
const apiRedis = require('./routes/redis-route');
const apiMysql = require('./routes/mysql-route');
const apiNeo4J = require('./routes/neo4j-route');
const apiServer = require('./routes/serverDB-routes');
const app = express();
app.use(cors());
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cross Origin middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', apiMongo);
app.use('/', apiRedis);
app.use('/', apiMysql);
app.use('/', apiNeo4J);
app.use('/', apiServer);

const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);

/*Listen on provided port, on all network interfaces.*/
server.listen(port, () => console.log(`API running on localhost:${port}`));
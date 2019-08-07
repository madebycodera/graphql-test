require('dotenv').config();
const http = require('http');
const https = require('https');
const express = require('express');
const path = require('path');
const { saveToFile } = require('./db');
const { todos } = require('./fixtures');

const config = require('./config/config');

const port = config.app.port;
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const server =
  config.app.modeServer === 'http'
    ? http.createServer(app)
    : https.createServer(
        {
          key: fs.readFileSync(config.app.openSslKeyPath),
          cert: fs.readFileSync(config.app.openSslCertPath),
        },
        app
      );

require('./server/cors')(app);
require('./server/compression')(app);
require('./server/log')(app);
require('./server/routes')(app);
require('./server/graphql')(app);
require('./server/cluster')(server, port, config.app.modeCluster);

saveToFile(todos).then(() => {
  console.log('Database was successfully seeded');
});

module.exports = app;

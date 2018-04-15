const express = require('express');
const helemt = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');

const proxy = require('./proxy');
const client = require('./client');

const { ENV } = require('./keys');

const app = express();

if (ENV === 'production') {
  app.use(helemt());
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(proxy());
app.use(client());

module.exports = app;

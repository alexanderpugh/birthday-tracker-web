const path = require('path');
const fs = require('fs');
const express = require('express');

const { ENV } = require('./keys');
const logger = require('./logger');

let html = '';

try {
  html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');

} catch (err) {
  logger.error(`Error reading file with error: ${err}`);
}

const devHTML = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="shortcut icon" href="/favicon.ico">
    <title>birthday-tracker-web</title>
    <link rel="stylesheet" href="https://bootswatch.com/4/united/bootstrap.min.css">
    <base href="/">
  <link rel="preload" as="script" href="/app.js">
</head>
  <body>
    <noscript>
      <strong>We're sorry but birthday-tracker-web doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  <script type="text/javascript" src="/app.js"></script></body>
</html>
`;

const router = express.Router();

router.use(express.static(path.resolve(__dirname, '../dist/')));

const sendHTML = ENV === 'production' ? html : devHTML;

const handler = (req, res) => res.send(sendHTML);

router.get('/', handler);
router.get('/register', handler);
router.get('/edit/:id', handler);
router.get('/create', handler);

router.use((req, res) => {
  res.status(404);
  res.send(sendHTML);
});

module.exports = () => router;

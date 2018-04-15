const axios = require('axios');
const _ = require('lodash');
const { Router } = require('express');

const { ENV, DEV_CLIENT, BACKEND_ROOT } = require('./keys');
const logger = require('./logger');

const router = Router();

/** Client server proxy */
if(ENV !== 'production') {
  router.use((req, res, next) => {
    (async () => {
      try {
        if (req.originalUrl.includes('sockjs')) {
          throw new Error('sockets can not be proxied');
        }

        const retry = `${DEV_CLIENT}${req.originalUrl}`;

        const request = await axios.get(retry);

        res.send(request.data);

      } catch (err) {
        next();
      }
    })();
  });
}

/** Backend proxy */
router.use((req, res, next) => {
  (async () => {
    try {
      if (ENV !== 'production' && req.originalUrl.includes('sockjs')) {
        throw new Error('sockets can not be proxied');
      }

      const method = _.toLower(req.method);
      const url = `${BACKEND_ROOT}${req.originalUrl}`;
      const body = req.body || {};

      const request = await axios[method](url, body);

      res.json(request.data);

    } catch (err) {
      logger.warn(`Backend proxy 404 with error: ${err}`);
      next();
    }
  })();
});

module.exports = () => router;

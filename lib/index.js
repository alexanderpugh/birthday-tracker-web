const app = require('./app');
const logger = require('./logger');

const PORT = process.env.PORT || 1234;

const main = () => {
  return new Promise((resolve, reject) => {
    app.listen(PORT, (err) => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });
};

main()
  .then(() => logger.info(`App running on port ${PORT}`))
  .catch((err) => logger.error(err));

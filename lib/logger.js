const bunyan = require('bunyan');

const logger = bunyan.createLogger({ name: "birthday-tracker-web" });

module.exports = logger;

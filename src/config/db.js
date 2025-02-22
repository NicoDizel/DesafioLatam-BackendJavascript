const getEnv = require('./env');

// Set DB variables
const dbConfig = {
    host: getEnv('DB_HOST'),
    user: getEnv('DB_USER'),
    password: getEnv('DB_PASSWORD'),
    database: getEnv('DB_NAME'),
    allowExitOnIdle: true,
};

module.exports = dbConfig;
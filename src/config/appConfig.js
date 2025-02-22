const getEnv = require('./env');

module.exports = {
    PORT: getEnv('PORT', 3000),
    JWT_SECRET: getEnv('JWT_SECRET')
};
require('dotenv').config();

const getEnv = (key, defaultValue = undefined) => {
    const value = process.env[key];
    if (!value && defaultValue === undefined) {
        throw new Error(`Falta la variable de entorno: ${key}`);
    }
    return value || defaultValue;
};

module.exports = getEnv;
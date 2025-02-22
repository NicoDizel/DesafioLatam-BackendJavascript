import { Sequelize } from 'sequelize';
import getEnv from './env.js';

const sequelize = new Sequelize(getEnv('DB_NAME'), getEnv('DB_USER'), getEnv('DB_PASSWORD'), {
    host: getEnv('DB_HOST'),
    dialect: 'postgres',
});

sequelize.authenticate()
    .then(() => console.log('Database connected'))
    .then(() => sequelize.sync())
    .catch(err => console.error('Error connecting to database:', err));

export default sequelize;
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Client = sequelize.define('Client', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contact_info: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'clients',
    timestamps: true
});

export default Client;

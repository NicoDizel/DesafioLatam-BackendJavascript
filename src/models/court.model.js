import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Court = sequelize.define('Court', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'courts',
    timestamps: true
});

export default Court;

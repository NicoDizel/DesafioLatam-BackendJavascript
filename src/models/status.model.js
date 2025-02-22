import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Status = sequelize.define('Status', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'status',
    timestamps: true
});

export default Status;
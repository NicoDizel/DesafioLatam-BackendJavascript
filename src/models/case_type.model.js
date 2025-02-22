import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const CaseType = sequelize.define('CaseType', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'case_types',
    timestamps: true
});

export default CaseType;

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Case from './case.model.js';

const Document = sequelize.define('Document', {
    case_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Case,
            key: 'id',
        },
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    file_path: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'documents',
    timestamps: true
});

export default Document;

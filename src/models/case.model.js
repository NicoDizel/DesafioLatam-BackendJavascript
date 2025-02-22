import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import CaseType from './case_type.model.js';
import Court from './court.model.js';
import User from './user.model.js';
import Status from './status.model.js';

const Case = sequelize.define('Case', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    case_type_id: {
        type: DataTypes.INTEGER,
        references: {
            model: CaseType,
            key: 'id',
        },
        allowNull: false,
    },
    court_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Court,
            key: 'id',
        },
        allowNull: false,
    },
    created_by: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
        allowNull: false,
    },
    status_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Status,
            key: 'id',
        },
        allowNull: false,
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'cases',
    timestamps: true
});

export default Case;

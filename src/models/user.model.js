import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Role from './role.model.js';
import bcrypt from "bcryptjs/dist/bcrypt.js";

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { message: 'El email ya está en uso.' }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: 'id',
        },
        allowNull: true,
    },
}, {
    tableName: 'users',
    timestamps: true
});

User.beforeCreate(async (user) => {
    console.log(user.password);
    user.password = await bcrypt.hash(user.password, 8);
});

export default User;

import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET } from "../config/appConfig.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";

export async function register(req, res) {
    // Obtain info from the body
    try {
        const { name, email, phone, password, role_id } = req.body;
        const user = await User.create({ name, email, phone, password, role_id });
        res.status(201).json({
            message: `Usuario ${user.email} registrado exitosamente.`
        })
    } catch (error) {
        res.status(401).json({
            message: 'Error al crear el usuario.'
        });
    }
}

export async function login(req, res) {
    try {
        // Obtain email and password from the body
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            res.status(401).json({
                message: 'Credenciales incorrectas. Por favor reintentar.'
            })}
        
        else {
            const checkPass = await bcrypt.compare(password, user.password);
            if (!checkPass) {
                res.status(401).json({
                    message: 'Credenciales incorrectas. Por favor reintentar.'
                });
            }
            else {
                const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
                res.status(201).json({ token });
            };
        };

    }
    catch(error) {
        res.status(401).json({
            message: 'Credenciales incorrectas. Por favor reintentar.'
        })
    }
};
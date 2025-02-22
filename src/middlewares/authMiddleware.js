import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../config/appConfig.js";

// Middleware for authentication
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        console.log('Token no proporcionado');
        return res.status(401).json({
            message: "Token no proporcionado."
        });
    }

    jwt.verify(token, JWT_SECRET, (error, user) => {
        if (error) {
            console.log('Error de verificación de token:', error.message);
            return res.status(403).json({
                message: "Error de verificación de token."
            });
        } else {
            req.user = user;
            console.log('Token verificado para el usuario:', user.username);
            next();
        }
    });
}

export default authenticateToken;
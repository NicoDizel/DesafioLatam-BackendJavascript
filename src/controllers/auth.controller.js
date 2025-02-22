const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/appConfig.js")

// Save users
const users = [];

exports.register = (req, res) => {
    // Obtain username and password from the body
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(401).json({
            message: 'Usuario o password no ingresado.'
        });
    } else {
        // Add username to users array
        users.push({ username, password });
        console.log(users);
        res.status(201).json({
            message: 'Usuario registrado exitosamente.'
        });
    }
};

exports.login = (req, res) => {
    // Obtain username and password from the body
    const { username, password } = req.body;
    // Check if user exists in users array
    const user = users.find((user) => user.username === username && user.password === password);

    // If user exists, then create token
    if (user) {
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
    } else {
        res.status(401).json({
            message: 'Credenciales incorrectas. Por favor reintentar.'
        })
    }
};
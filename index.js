const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const app = express();

// Env variables
const SECRET_KEY = process.env.SECRET_KEY || '8$bv&901';
const PORT = process.env.PORT || 3000;

// Middlewares for formatting
app.use(express.json());
app.use((req, res, next) => {
    console.log(`Request to URL: ${req.url}`);
    next();
});

// Middlewares for authentication
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        console.log('Token no proporcionado');
        return res.status(401).send("Token no proporcionado.");
    }

    jwt.verify(token, SECRET_KEY, (error, user) => {
        if (error) {
            console.log('Error de verificación de token:', error.message);
            return res.status(403).send("Error de verificación de token.");
        } else {
            req.user = user;
            console.log('Token verificado para el usuario:', user.username);
            next();
        }
    });
}


// Principal endpoint
app.get('/', (req, res) => {
    res.status(200).send('Bienvenido a la API de administración de casos judiciales de LawCases©.');
});

const users = [];

// Endpoint to register
app.post('/register', (req, res) => {
    // Obtain username and password from the body
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(401).send('Usuario o password no ingresado.');
    } else {
        // Add username to users array
        users.push({ username, password });
        console.log(users);
        res.status(201).send('Usuario registrado exitosamente.');
    }
});

// Endpoint to login
app.post('/login', (req, res) => {
    // Obtain username and password from the body
    const { username, password } = req.body;
    // Check if user exists in users array
    const user = users.find((user) => user.username === username && user.password === password);

    // If user exists, then create token
    if (user) {
        const newToken = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        res.status(201).json({ newToken });
    } else {
        res.status(401).send('Credenciales incorrectas. Por favor reintentar.')
    }


})

// Endpoint to obtain the cases portfolio
app.get('/cases', authenticateToken, (req, res) => {
    const cases = JSON.parse(fs.readFileSync('cases.json'));
    res.status(200).json(cases);
});

// Endpoint to obtain a specific case in the portfolio
app.get('/cases/:id', authenticateToken, async (req, res) => {
    const cases = JSON.parse(fs.readFileSync('cases.json'));
    const { id } = req.params;
    const caseSearched = cases.cases.find((cas) => cas.caseId === id);
    if (caseSearched) {
        res.status(200).json(caseSearched);
    }
    else {
        res.status(404).send(`Caso ${id} no encontrado en el portafolio.`);
    }
});

// Init API on the port 3000.
app.listen(PORT, console.log('Servidor encendido'));

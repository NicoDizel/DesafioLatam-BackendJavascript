const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const { getCase, getCases, addCase, updateCase, deleteCase } = require('./queries');

// Env variables
const SECRET_KEY = process.env.SECRET_KEY || '8$bv&901';
const PORT = process.env.PORT || 3000;

// Middlewares for formatting
app.use(express.json());
app.use((req, res, next) => {
    console.log(`Request to URL: ${req.url}`);
    next();
});

// Middleware for authentication
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

// Middleware for validate the id case (if exist, then continue)
async function validateCaseId(req, res, next) {
    const { id } = req.params;
    const caseSearched = await getCase(id);
    if (caseSearched) {
        console.log('Se verifica que el id del caso existe.');
        next();
    }
    else {
        console.log('El id del caso no existe, por lo que no se puede ejecutar el siguiente paso.');
        return res.status(404).json({
            message: `Caso ${id} no encontrado en el portafolio.`
        });
    }
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
app.get('/cases', authenticateToken, async (req, res) => {
    const cases = await getCases();
    res.status(200).json(cases);
});

// Endpoint to obtain a specific case in the portfolio
app.get('/cases/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const caseSearched = await getCase(id);
        if (caseSearched) {
            res.status(200).json(caseSearched);
        }
        else {
            res.status(404).json({
                message: `Caso ${id} no encontrado en el portafolio.`
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al obtener el caso.'
        })
    }
});

// Endpoint to add a new case to the portfolio
app.post('/cases', authenticateToken, async (req, res) => {
    try {
        const { title, type_id, status, start_date, end_date, description, court_id } = req.body;
        await addCase(title, type_id, status, start_date, end_date, description, court_id);
        res.status(200).json({
            message: 'Caso añadido de forma exitosa.'
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al añadir el caso.'
        })
    }
});

// Endpoint to update the status of a specific case
app.put('/cases/:id', authenticateToken, validateCaseId, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.query;
        const result = await updateCase(id, status);
        res.status(200).json({
            message: `Caso ${id}: status actualizado a ${status}.`
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error al actualizar el caso.'
        })
    }
})

// Endpoint to delete a specific case
app.delete('/cases/:id', authenticateToken, validateCaseId, async (req, res) => {
    const { id } = req.params;
    try {
        await deleteCase(id);
        res.status(200).json({
            message: `Caso ${id}: eliminado exitosamente.`
        });
    }
    catch (error) {
        res.status(500).json({
            message: `Error al borrar el caso. Error: ${error.message}`
        })
    }
})

// Init API on the port 3000.
app.listen(PORT, console.log('Servidor encendido'));

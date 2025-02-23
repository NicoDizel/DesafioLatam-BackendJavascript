const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const http = require('http');
const path = require('path');
const { initSocket } = require('./socket');
const router = require('./routes/index.js');

/**
* Configuración inicial del servidor
* Integra Express con Socket.IO a través del servidor HTTP
*/
const app = express();
const server = http.createServer(app);

/**
* Configuración de Middleware
*/
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '..', 'public')));

// Rutas
app.use('/', router);

// Inicializa Socket.IO
initSocket(server);

// Inicia el servidor HTTP
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
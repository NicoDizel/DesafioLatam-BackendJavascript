import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import router from '../routes/routes.js';
import errorHandler from '../middlewares/error.middleware.js';
const app = express();

/**
* Configuración de Middleware
* Establece la cadena de procesamiento de solicitudes
*/
// Habilita el parseado de JSON en el cuerpo de las peticiones
app.use(express.json());
// Configura el procesamiento de cookies
app.use(cookieParser());
// Configura el logging de solicitudes HTTP
app.use(morgan('dev'));

/**
 *Middleware de nivel de aplicación
* Se ejecuta en cada solicitud que llega al servidor
*
* @param {Object} req - Objeto de solicitud
* @param {Object} res - Objeto de respuesta
* @param {Function} next - Función para pasar al siguiente middleware
*/
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});

/**
* Middleware de nivel de router
* Se ejecuta solo para las rutas definidas en este router
*/
router.use((req, res, next) => {
    console.log('Estas utilizando la ruta: ', req.originalUrl);
    next();
});

/**
* Middleware de nivel de router
* Se ejecuta para gestionar de manera personalizada los errores
*/
router.use(errorHandler);

/**
* Estructuras de datos para el sistema de mensajería
*/
const messages = []; // Almacena los mensajes pendientes

/**
* Endpoint de bienvenida
*
* @route POST /
* @returns {Object} Estado del envío
*/
app.get('/', (req, res) => {
    res.status(200).send('Bienvenido a la app de mensajeria.')
});


/**
* Endpoint para enviar mensajes
*
* @route POST /send
* @param {Object} req.body.message - Mensaje a enviar
* @returns {Object} Estado del envío
*/
app.post('/send', (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'El mensaje es requerido' });
    }
    messages.push({ header: 'Mensaje', body: message });
    console.log('Mensaje recibido:', message);
    res.status(200).json({ 
        status: 'Mensaje enviado exitosamente',
        body: {message: message}
     });
});

/**
* Endpoint para recibir mensajes
* Implementa patrón FIFO
*
* @route GET /receive
* @returns {Object} Mensaje o respuesta vacía
*/
app.get('/receive', (req, res) => {
    console.log(messages);
    if (messages.length > 0) {
        const message = messages.shift();
        return res.status(200).json({ message });
    } else {
        return res.status(204).send();
    }
});

// Monta el router en el path /route
app.use('/route', router);

export default app;
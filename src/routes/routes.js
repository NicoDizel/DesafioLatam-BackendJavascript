import express from 'express';
const router = express.Router();

/**
* Ruteo basado en en el tipo de contenido
* Maneja diferentes tipos de respuesta según el parámetro type
*
* @route GET /route
* @param {string} type - Tipo de respuesta solicitada (text/json)
*/
router.get('/', (req, res) => {
    const { type } = req.query;
    if (type === 'text') {
        res.status(200).send('Mensaje de texto enviado.');
    } else if (type === 'json') {
        res.status(200).json({ message: 'Mensaje en formato JSON enviado.' });
    } else {
        res.status(400).send('Tipo de mensaje no soportado.');
    }
});

/**
* Ruteo para forzar un error
* Forza un error para evaluar un middleware
*
* @route GET /route/error
*/
router.get('/error', (req, res, next) => {
    const error = new Error('Error a nivel de ruta.');
    next(error);
});

export default router;
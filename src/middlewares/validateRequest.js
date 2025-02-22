const { getCase } = require('../models/case.model.js')

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

module.exports = validateCaseId;
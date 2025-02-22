import Case from '../models/case.model.js';

// Middleware for validate the id case (if exist, then continue)
async function validateCaseId(req, res, next) {
    const { case_id } = req.params;
    const caseSearched = await Case.findByPk(case_id);
    if (caseSearched) {
        console.log('Se verifica que el id del caso existe.');
        next();
    }
    else {
        console.log('El id del caso no existe, por lo que no se puede ejecutar el siguiente paso.');
        return res.status(404).json({
            message: `Caso ${case_id} no encontrado en el portafolio.`
        });
    }
}

export default validateCaseId;
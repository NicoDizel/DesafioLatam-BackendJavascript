const { 
    getCase,
    getCases, 
    addCase, 
    updateCase, 
    deleteCase } = require('../models/case.model.js');

exports.getCases = async (req, res) => {
    const cases = await getCases();
    res.status(200).json(cases);
};

exports.getCase = async (req, res) => {
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
};

exports.addCase = async (req, res) => {
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
};

exports.updateCase = async (req, res) => {
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
};

exports.deleteCase = async (req, res) => {
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
};




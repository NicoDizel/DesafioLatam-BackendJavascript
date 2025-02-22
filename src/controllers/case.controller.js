import Case from '../models/case.model.js';

export async function getCases(req, res) {
    const cases = await Case.findAll();
    res.status(200).json(cases);
}

export async function getCase(req, res) {
    const { case_id } = req.params;
    try {
        const caseSearched = await Case.findByPk(case_id);
        if (caseSearched) {
            res.status(200).json(caseSearched);
        }
        else {
            res.status(404).json({
                message: `Caso ${case_id} no encontrado en el portafolio.`
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al obtener el caso.'
        })
    }
}

export async function addCase(req, res) {
    try {
        const { title, description, case_type_id, court_id, created_by, status_id, start_date, end_date} = req.body;
        await Case.create({
            title: title,
            description: description,
            case_type_id: case_type_id,
            court_id: court_id,
            created_by: created_by,
            status_id: status_id,
            start_date:start_date,
            end_date: end_date
        })
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
}

export async function updateCase(req, res) {
    try {
        const { case_id } = req.params;
        const { status_id } = req.body;
        
        await Case.update(
            {status_id: status_id},
            {where: {id: case_id}}
        );

        res.status(200).json({
            message: `Caso ${case_id}: status actualizado a ${status_id}.`
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error al actualizar el caso.'
        })
    }
}

export async function deleteCase(req, res) {
    const { case_id } = req.params;
    try {
        await Case.destroy({
            where: {id: case_id}
        });
        res.status(200).json({
            message: `Caso ${case_id}: eliminado exitosamente.`
        });
    }
    catch (error) {
        res.status(500).json({
            message: `Error al borrar el caso. Error: ${error.message}`
        })
    }
}




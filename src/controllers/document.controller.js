import Document from '../models/document.model.js';

export async function getDocumentsByCase(req, res) {
    const { case_id } = req.params;
    try {
        const documentsSearched = await Document.findAll({where: {case_id: case_id}});
        if (documentsSearched.length != 0) {
            res.status(200).json(documentsSearched);
        }
        else {
            res.status(404).json({
                message: `Documentos para el caso ${case_id} no encontrados.`
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al obtener los documentos.'
        })
    }
}

export async function getDocumentByCase(req, res) {
    const { case_id, document_id } = req.params;
    try {
        const documentsSearched = await Document.findAll({where: {id: document_id, case_id: case_id}});
        if (documentsSearched.length != 0) {
            res.status(200).json(documentsSearched);
        }
        else {
            res.status(404).json({
                message: `Documento ${document_id} para el caso ${case_id} no encontrado.`
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al obtener los documentos.'
        })
    }
}

export async function addDocument(req, res) {
    const { case_id } = req.params;
    try {
        const {name, type, file_path} = req.body;
        await Document.create({
            case_id: case_id,
            name: name,
            type: type,
            file_path: file_path
        })
        res.status(200).json({
            message: 'Documento añadido de forma exitosa.'
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al añadir el documento.'
        })
    }
}

export async function updateDocument(req, res) {
    try {
        const { case_id, document_id } = req.params;
        const { name } = req.body;
        
        await Document.update(
            {name: name},
            {where: {id: document_id, case_id: case_id}}
        );

        res.status(200).json({
            message: `Documento ${document_id}: nombre actualizado a ${name}.`
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error al actualizar el nombre del documento.'
        })
    }
}

export async function deleteDocument(req, res) {
    const { case_id, document_id } = req.params;
    try {
        await Document.destroy({
            where: {id: document_id, case_id: case_id}
        });
        res.status(200).json({
            message: `Documento ${document_id} del caso ${case_id} eliminado exitosamente.`
        });
    }
    catch (error) {
        res.status(500).json({
            message: `Error al borrar el documento. Error: ${error.message}`
        })
    }
}




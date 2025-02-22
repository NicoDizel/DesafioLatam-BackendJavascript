import { Router } from 'express';
const router = Router({ mergeParams: true });
import authenticateToken from '../middlewares/authMiddleware.js';
import validateCaseId from '../middlewares/validateRequest.js';
import { getDocumentsByCase, getDocumentByCase, addDocument, updateDocument, deleteDocument } from "../controllers/document.controller.js";

router.use(authenticateToken);

// Endpoint to obtain the documents of a specific case
router.get('/', validateCaseId, getDocumentsByCase);

// Endpoint to obtain a specific document of a specific case
router.get('/:document_id', validateCaseId, getDocumentByCase);

// Endpoint to add a new documento to a case
router.post('/', validateCaseId, addDocument);

// Endpoint to update the name of a specific document by case
router.put('/:document_id', validateCaseId, updateDocument);

// Endpoint to delete a specific document of a case
router.delete('/:document_id', validateCaseId, deleteDocument);

export default router;



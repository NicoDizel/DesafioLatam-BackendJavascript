const { Router } = require('express');
const router = Router();
const authenticateToken = require('../middlewares/authMiddleware.js');
const validateCaseId = require('../middlewares/validateRequest.js')
const { getCases, getCase, addCase, updateCase, deleteCase } = require("../controllers/case.controller.js");

router.use(authenticateToken);

// Endpoint to obtain the cases portfolio
router.get('/', getCases);

// Endpoint to obtain a specific case in the portfolio
router.get('/:id', getCase);

// Endpoint to add a new case to the portfolio
router.post('/', addCase);

// Endpoint to update the status of a specific case
router.put('/:id', validateCaseId, updateCase);

// Endpoint to delete a specific case
router.delete('/:id', validateCaseId, deleteCase);

module.exports = router;

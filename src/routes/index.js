const { Router } = require("express");
const router = Router();
const authRoutes = require("./auth.routes.js")
const caseRoutes = require("./case.routes.js")

// Principal endpoint
router.get('/', (req, res) => {
    res.status(200).send('Bienvenido a la API de administración de casos judiciales de LegalBound©.');
});

router.use('/', authRoutes);
router.use('/cases', caseRoutes);

module.exports = router;


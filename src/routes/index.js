import { Router } from "express";
import authRoutes from "./auth.routes.js";
import caseRoutes from "./case.routes.js";

const router = Router();

// Principal endpoint
router.get('/', (req, res) => {
    res.status(200).send('Bienvenido a la API de administración de casos judiciales de JuseEasy.');
});

router.use('/', authRoutes);
router.use('/cases', caseRoutes);

export default router;


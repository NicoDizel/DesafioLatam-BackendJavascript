import { Router } from "express";
import authRoutes from "./auth.routes.js";
import caseRoutes from "./case.routes.js";
import documentRoutes from "./document.routes.js";

const router = Router();

// Principal endpoint
router.get('/', (req, res) => {
    res.status(200).send('Bienvenido a la API de administración de casos judiciales de JuseEasy.');
});

router.use('/auth', authRoutes);
router.use('/cases', caseRoutes);
router.use('/cases/:case_id/documents', documentRoutes)

export default router;


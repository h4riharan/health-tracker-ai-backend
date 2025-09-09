import { Router } from 'express';
import dataController from '../controllers/dataController';
import authenticateJWT from '../middleware/auth';

const router = Router();

// Route for submitting health metrics
router.post('/metrics', authenticateJWT, dataController.submitMetrics);

// Route for getting user metrics
router.get('/metrics', authenticateJWT, dataController.getUserMetrics);

// Route for getting user alerts
router.get('/alerts', authenticateJWT, dataController.getUserAlerts);

export default router;
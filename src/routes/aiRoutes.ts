import { Router } from 'express';
import { AIController } from '../controllers/aiController';

const router = Router();
const aiController = new AIController();

// Route to get personalized insights based on user data
router.post('/insights', aiController.getInsights);

// Route to check for anomalies in user health data
router.get('/anomalies', aiController.checkAnomalies);

export default router;
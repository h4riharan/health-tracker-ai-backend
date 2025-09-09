import { Request, Response } from 'express';
import { getAIInsights } from '../services/aiService';

export class AIController {
    public async generateInsights(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.user.id; // Assuming user ID is attached to the request after authentication
            const userData = req.body; // Expecting user data to be sent in the request body

            const insights = await getAIInsights(userId, userData);
            res.status(200).json({ insights });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            res.status(500).json({ message: 'Error generating insights', error: errorMessage });
        }
    }

    public getInsights(req: import('express').Request, res: import('express').Response): void {
        // Implement your logic here
        res.json({ message: 'Insights generated successfully.' });
    }

    public checkAnomalies(req: import('express').Request, res: import('express').Response): void {
        // TODO: Implement anomaly checking logic
        res.json({ message: 'Anomaly check not yet implemented.' });
    }
}
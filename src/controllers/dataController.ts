import { Request, Response } from 'express';
import HealthData from '../models/healthData';
import { getAIInsights } from '../services/aiService';

class DataController {
    async submitMetrics(req: Request, res: Response) {
        try {
            const userId = req.user.id;
            const { steps, heartRate, sleepHours } = req.body;

            // Anomaly detection logic
            let alert = null;
            if (heartRate > 120) {
                alert = {
                    type: 'High Heart Rate',
                    message: `Your heart rate is unusually high (${heartRate} bpm).`,
                    timestamp: new Date(),
                };
            }

            // Save metrics to DB, including alert if any
            const healthData = new HealthData({
                userId,
                steps,
                heartRate,
                sleepHours,
                timestamp: new Date(),
                ...(alert && { alert }), // only add alert if present
            });
            await healthData.save();

            // Optionally, get AI insights
            const insights = await getAIInsights(userId, { steps, heartRate, sleepHours });

            res.status(201).json({ message: 'Metrics submitted.', insights, alert });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error submitting metrics.' });
        }
    }

    async getUserMetrics(req: Request, res: Response) {
        try {
            const userId = req.user.id;
            const metrics = await HealthData.find({ userId }).sort({ timestamp: 1 });
            res.status(200).json(metrics);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching metrics.' });
        }
    }

    async getUserAlerts(req: Request, res: Response) {
        try {
            const userId = req.user.id;
            // Fetch HealthData entries with an alert field (customize as needed)
            const alerts = await HealthData.find({
                userId,
                alert: { $exists: true, $ne: null }
            }).sort({ timestamp: -1 });

            res.status(200).json(alerts);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch alerts' });
        }
    }
}

export default new DataController();
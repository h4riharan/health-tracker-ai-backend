import type { HealthDataDocument } from '../models/healthData';

export const detectAnomalies = (healthData: HealthDataDocument[]) => {
    const alerts: string[] = [];

    healthData.forEach(data => {
        if (data.heartRate > 120) {
            alerts.push(`Alert: Elevated heart rate detected at ${data.timestamp}.`);
        }
        // Additional anomaly detection rules can be added here
    });

    return alerts;
};
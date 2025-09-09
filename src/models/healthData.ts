import mongoose, { Document, Schema } from 'mongoose';

export interface HealthDataDocument extends Document {
    heartRate: number;
    timestamp: Date;
    // ...other fields
}

const healthDataSchema: Schema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    steps: Number,
    heartRate: Number,
    sleepHours: Number,
    timestamp: { type: Date, default: Date.now },
    alert: {
        type: {
            type: String,
        },
        message: String,
        timestamp: Date,
    },
});

const HealthData = mongoose.model<HealthDataDocument>('HealthData', healthDataSchema);
export default HealthData;

export async function getUserAlerts(req: any, res: any) {
    try {
        const userId = req.user.id;
        const alerts = await HealthData.find({ userId, alert: { $exists: true } }).sort({ timestamp: -1 });
        res.status(200).json(alerts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching alerts.' });
    }
}


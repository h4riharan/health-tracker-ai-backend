import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import dataRoutes from './routes/dataRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import { json } from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Important for parsing JSON bodies

// Database connection
const mongoURI = process.env.MONGODB_URI as string;

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected!'))
  .catch((err: unknown) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', dataRoutes);
app.use('/api/ai', aiRoutes);
app.get('/api/test', (req, res) => res.send('API is working'));
app.get('/', (req, res) => {
  res.send('Health Tracker API is running');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
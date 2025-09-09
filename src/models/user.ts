import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    healthData: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HealthData'
    }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
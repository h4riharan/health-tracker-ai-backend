# AI-Powered Personalized Health Tracker - Backend

## Overview
This backend application serves as the server-side component of the AI-Powered Personalized Health Tracker. It is built using Node.js and Express, and it interacts with a MongoDB database to manage user data and health metrics.

## Features
- User authentication with JWT
- Submission and retrieval of health metrics
- Integration with an AI API for personalized health insights
- Anomaly detection for health data

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd ai-health-tracker/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Configuration
- Create a `.env` file in the `backend` directory and add the following variables:
  ```
  MONGODB_URI=<your_mongodb_connection_string>
  JWT_SECRET=<your_jwt_secret>
  AI_API_KEY=<your_ai_api_key>
  ```

### Running the Application
To start the server, run:
```
npm start
```
The server will run on `http://localhost:5000` by default.

### API Endpoints
- **Authentication**
  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - Login an existing user

- **Health Data**
  - `POST /api/data/submit` - Submit daily health metrics
  - `GET /api/data` - Retrieve user-specific health data

- **AI Insights**
  - `GET /api/ai/insights` - Get personalized insights based on user data

## Security
Ensure that all user data is handled securely and that JWT tokens are used for authentication on protected routes.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
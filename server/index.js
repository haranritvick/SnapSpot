import express from 'express';
import dotenv from 'dotenv'; 
import bodyParser from 'body-parser'; 
import cors from 'cors'; 
import connectToDatabase from './db/connectTomongoDB.js';
import authRoutes from './Routes/auth.Routes.js'
import sessionMiddleware from './utils/createSession.js';

dotenv.config();

// Create an Express app
const app = express();

// Middleware setup
app.use(cors()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(sessionMiddleware); // Enable session handling

// Test route
app.get('/test', (req, res) => {
  res.send('Test endpoint working');
});

app.use("/api/auth",authRoutes)

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await connectToDatabase();
});

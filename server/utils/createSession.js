import session from 'express-session';
import MongoStore from 'connect-mongo';

const sessionOptions = {
  secret: 'your_secret_key', // Replace with a secure key
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_DB_URI, // Replace with your MongoDB connection string
  }),
  cookie: {
    secure: false, // Set to true if using HTTPS
    httpOnly: true, // Prevent client-side JavaScript access
    maxAge: 24 * 60 * 60 * 1000, // Session expiry (1 day)
  },
};

// Initialize session middleware
const sessionMiddleware = session(sessionOptions);

// Function to create a session
export const createSessionAndSaveCookie = (req, userId) => {
  if (!userId) {
    return res.status(400).json({ error: 'Invalid user data provided' });
  }

  // Attach user data to the session
  req.session.user = {
    id: userId,
  };

  console.log(`Session created for user ID: ${userId}`);
};

// Export session middleware for app-level use
export default sessionMiddleware;

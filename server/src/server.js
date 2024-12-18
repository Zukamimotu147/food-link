import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import dotenv, { config } from 'dotenv';
import authRoutes from './routes/authRoute.js';
import landingRoutes from './routes/landingRoutes.js';

import './config/passport.js';
import restaurantRoutes from './routes/restaurantRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      'https://food-link.netlify.app',
      'http://localhost:5173',
      'https://food-link-q0n1lkssh-marcs-projects-a91672ad.vercel.app',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production', // Ensures cookie is only sent over HTTPS in production
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // Allows cross-origin cookies in production
      httpOnly: true,
    },
  })
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/auth', authRoutes);
app.use('/api/landing', landingRoutes);

app.use('/api/admin', adminRoutes);
app.use('/api/restaurant', restaurantRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use((err, req, res, next) => {
  console.error('Error occurred:', err);

  if (!res.headersSent) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});

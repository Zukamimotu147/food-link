import express, { Response, Request } from 'express';
import session from 'express-session';
import passport from 'passport';
import { createServer } from 'http';
import { Server as IO } from 'socket.io';
import cors from 'cors';
import dotenv, { config } from 'dotenv';
import authRoutes from './routes/authRoute';
import landingRoutes from './routes/landingRoutes';
import './config/passport';

dotenv.config();

const app = express();
// const server = createServer(app);
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// const io = new IO(server, {
//   cors: {
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST'],
//   },
// });

// Session Config
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: true,
  })
);

// initSocket(io);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/auth', authRoutes);
app.use('/api/landing', landingRoutes);

// app.use('/api/admin', adminRoutes);
// app.use('/api/user', userRoutes);

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error('Error occurred:', err);

  if (!res.headersSent) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

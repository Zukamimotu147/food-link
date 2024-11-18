import express, { Response, Request } from 'express';
import session from 'express-session';
import passport from 'passport';
import { createServer } from 'http';
import { Server as IO } from 'socket.io';
import cors from 'cors';
import dotenv, { config } from 'dotenv';
import authRoutes from './routes/authRoute';
import './config/passport';

dotenv.config();

const app = express();
const server = createServer(app);
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: 'http://localhost:5000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

const io = new IO(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: true,
  })
);
// initSocket(io);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

// app.use('/api/admin', adminRoutes);
// app.use('/api/user', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(PORT || 5000, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { login, register } from '../controllers/authController';
import { generateToken } from '../services/generateToken';
import { authenticateJWT } from '../middleware/authenticateJWT';

const router = Router();

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await register(req, res);
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await login(req, res);
  } catch (error) {
    next(error);
  }
});
type User = {
  Id: string;
  googleId: string;
  name: string;
  email: string;
  password: string;
  userType: string;
};

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:5173/auth/login' }),
  (req, res, next) => {
    const userData = req.user as User;

    const token = jwt.sign(
      {
        userId: userData.Id,
        password: userData.password,
        googleId: userData.googleId,
        email: userData.email,
        role: userData.userType,
        name: userData.name,
      },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );

    if (userData.userType === 'ADMIN') {
      res.redirect(`http://localhost:5173/dasboard/admin?token=${token}`);
    } else if (userData.userType === 'RESTAURANT') {
      res.redirect(`http://localhost:5173/dashboard/restaurant?token=${token}`);
    }
  }
);

router.get(
  '/currentUser',
  (req, res, next) => {
    authenticateJWT(req, res, next);
  },
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(req.user);
  }
);

router.get('/logout', (req, res) => {
  // Passport provides `req.logout` to clear the session
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).send({ message: 'Error during logout' });
    }

    // Clear session and cookies
    req.session.destroy((sessionErr) => {
      if (sessionErr) {
        console.error('Session destruction error:', sessionErr);
        return res.status(500).send({ message: 'Error clearing session' });
      }

      res.clearCookie('connect.sid'); // Default cookie name for session
      res.status(200).send({ message: 'Logged out successfully' });
    });
  });
});

export default router;

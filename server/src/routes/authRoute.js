import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { login, register } from '../controllers/authController';
import { generateToken } from '../services/generateToken';
import { authenticateJWT } from '../middleware/authenticateJWT';

const router = Router();

router.post('/register', async (req, res, next) => {
  try {
    await register(req, res);
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    await login(req, res);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'], prompt: 'select_account' })
);
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:5173/auth/login' }),
  (req, res, next) => {
    const userData = req.user;

    const token = jwt.sign(
      {
        userId: userData.Id,
        password: userData.password,
        googleId: userData.googleId,
        googleProfilePic: userData.googleProfilePic,
        email: userData.email,
        role: userData.userType,
        name: userData.name,
      },
      process.env.JWT_SECRET,
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
  async (req, res, next) => {
    res.send(req.user);
  }
);

router.get('/logout', (req, res) => {
  req.logout((err) => {
    try {
      if (err) {
        throw err;
      }
      res.redirect('http://localhost:5173/auth/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  });
});

export default router;

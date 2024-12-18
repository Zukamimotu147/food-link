import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { login, register } from '../controllers/authController.js';
// import { generateToken } from '../services/generateToken';
import { authenticateJWT } from '../middleware/authenticateJWT.js';

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
  passport.authenticate('google', {
    failureRedirect: 'https://food-link-murex.vercel.app/auth/login',
  }),
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
      res.redirect(`https://food-link-murex.vercel.app/dashboard/admin?token=${token}`);
    } else if (userData.userType === 'RESTAURANT') {
      res.redirect(`https://food-link-murex.vercel.app/dashboard/restaurant?token=${token}`);
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
      res.redirect('https://food-link-theta.vercel.app/auth/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  });
});

export default router;

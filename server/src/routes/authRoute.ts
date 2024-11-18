import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { login, register } from '../controllers/authController';

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

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/'); // Redirect to your route after successful login
  }
);

export default router;

import { Router, Request, Response } from 'express';
import passport from 'passport';
import { login, register } from '../controllers/authController';

const router = Router();

router.post('/register', (req, res, next) => {
  register(req, res)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/login', (req, res, next) => {
  login(req, res)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/'); // Redirect to your desired route after successful login
  }
);

export default router;

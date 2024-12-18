import { Router } from 'express';
import { contactController } from '../controllers/landingController.js';
const router = Router();

router.post('/contact', async (req, res, next) => {
  try {
    await contactController(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;

import { Router, Request, Response, NextFunction } from 'express';
import {
  addCharity,
  deleteCharity,
  updateCharity,
  getCharities,
  getDonationHistory,
  approveDonation,
  rejectDonation,
  getDonationRequests,
  //   getCurrentAdminUser,
} from '../controllers/admin/adminController';

const router = Router();

router.post('/addCharity', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await addCharity(req, res);
  } catch (error) {
    next(error);
  }
});

router.delete(
  '/deleteCharity/:charityId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await deleteCharity(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.put('/updateCharity/:charityId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await updateCharity(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/getCharities', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getCharities(req, res);
  } catch (error) {
    next(error);
  }
});

router.put(
  '/approveDonation/:donationId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await approveDonation(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/rejectDonation/:donationId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await rejectDonation(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/getDonationRequest', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getDonationRequests(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/getDonationHistory', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getDonationHistory(req, res);
  } catch (error) {
    next(error);
  }
});

// router.get(
//   '/getCurrentAdminUser/:userId',
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await getCurrentAdminUser(req, res);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

export default router;

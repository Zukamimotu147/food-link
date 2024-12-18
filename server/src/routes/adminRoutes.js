import { Router, Request, Response, NextFunction } from 'express';
import {
  addCharity,
  deleteCharity,
  updateCharity,
  getCharities,
  getAdminDonationHistory,
  approveDonation,
  rejectDonation,
  getDonationRequests,
  //   getCurrentAdminUser,
} from '../controllers/admin/adminController';
import { upload } from '../middleware/multer';

const router = Router();

router.post('/addCharity', upload.single('charityPhotoUrl'), async (req, res, next) => {
  try {
    await addCharity(req, res);
  } catch (error) {
    next(error);
  }
});

router.delete('/deleteCharity/:charityId', async (req, res, next) => {
  try {
    await deleteCharity(req, res);
  } catch (error) {
    next(error);
  }
});

router.put('/updateCharity/:charityId', async (req, res, next) => {
  try {
    await updateCharity(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/getCharities', async (req, res, next) => {
  try {
    await getCharities(req, res);
  } catch (error) {
    next(error);
  }
});

router.put('/approveDonation/:donationId', async (req, res, next) => {
  try {
    await approveDonation(req, res);
  } catch (error) {
    next(error);
  }
});

router.put('/rejectDonation/:donationId', async (req, res, next) => {
  try {
    await rejectDonation(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/getDonationRequest', async (req, res, next) => {
  try {
    await getDonationRequests(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/getAdminDonationHistory', async (req, res, next) => {
  try {
    await getAdminDonationHistory(req, res);
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

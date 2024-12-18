import { Router } from 'express';
import {
  addDonationRequest,
  deleteDonationRequest,
  updateDonationRequest,
  viewDonationRequests,
  //   editRestaurantProfile,
  viewResDonationHistory,
  viewDonationStatusSummary,
  viewTotalUsers,
  viewTotalCharities,
  viewTotalDonations,
} from '../controllers/restaurant/restaurantController.js';
import { upload } from '../middleware/multer.js';

const router = Router();

router.post(
  '/addDonationRequest/:userId/:charityName',
  upload.single('photoUrl'),
  async (req, res, next) => {
    try {
      await addDonationRequest(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/deleteDonationRequest/:donationId', async (req, res, next) => {
  try {
    await deleteDonationRequest(req, res);
  } catch (error) {
    next(error);
  }
});

router.put('/updateDonationRequest/:donationId', async (req, res, next) => {
  try {
    await updateDonationRequest(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/viewDonationRequests/:userId', async (req, res, next) => {
  try {
    await viewDonationRequests(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/viewResDonationHistory/:userId', async (req, res) => {
  try {
    await viewResDonationHistory(req, res);
  } catch (error) {
    console.log(error);
  }
});

// RESTAURANT OVERVIEW
router.get('/viewTotalUsers', async (req, res, next) => {
  try {
    await viewTotalUsers(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/viewTotalCharities', async (req, res, next) => {
  try {
    await viewTotalCharities(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/viewTotalDonations', async (req, res, next) => {
  try {
    await viewTotalDonations(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/viewDonationStatusSummary/:userId', async (req, res, next) => {
  try {
    await viewDonationStatusSummary(req, res);
  } catch (error) {
    next(error);
  }
});

// router.put(
//   '/editRestaurantProfile/:restaurantId',
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await editRestaurantProfile(req, res);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// router.get(
//   '/getCurrentRestaurantUser/:userId',
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await getCurrentRestaurantUser(req, res);
//     } catch (error) {
//       next(error);
//     }
//   }
// );
export default router;

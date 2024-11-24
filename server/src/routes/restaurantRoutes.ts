import { Router, Request, Response, NextFunction } from 'express';
import {
  addDonationRequest,
  deleteDonationRequest,
  updateDonationRequest,
  viewDonationRequests,
  editRestaurantProfile,
  getCurrentRestaurantUser,
} from '../controllers/restaurant/restaurantController';

const router = Router();

router.post(
  '/addDonationRequest/:userId/:charityName',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await addDonationRequest(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/deleteDonationRequest/:donationId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await deleteDonationRequest(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/updateDonationRequest/:donationId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await updateDonationRequest(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/viewDonationRequests/:restaurantId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await viewDonationRequests(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/editRestaurantProfile/:restaurantId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await editRestaurantProfile(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/getCurrentRestaurantUser/:userId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getCurrentRestaurantUser(req, res);
    } catch (error) {
      next(error);
    }
  }
);
export default router;

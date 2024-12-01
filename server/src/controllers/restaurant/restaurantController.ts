import { db } from '../../drizzle/database/connection';
import { eq, and, or, sql } from 'drizzle-orm';
import { NextFunction, Request, Response } from 'express';
import { cloudinary } from '../../config/cloudinary';

import {
  restaurantTable,
  foodDonationTable,
  //   pickupScheduleTable,
  //   donationHistoryTable,
  charityTable,
  usersTable,
} from '../../drizzle/tableSchema';

export const addDonationRequest = async (req: Request, res: Response) => {
  const { userId, charityName } = req.params;

  const {
    restaurantName,
    foodItemName,
    quantity,
    category,
    description,
    streetAddress,
    barangay,
    city,
    province,
    pickupDate,
    specialInstructions,
    contactName,
    contactNumber,
    allergens,
    storageRequirements,
    status,
  } = req.body;

  try {
    const userExists = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.Id, parseInt(userId)));

    if (!userExists || userExists.length === 0) {
      return res.status(400).json({ message: 'User  does not exist or is not a restaurant' });
    }

    // Check if the charity exists
    const charityExists = await db
      .select()
      .from(charityTable)
      .where(eq(charityTable.charityName, charityName));

    if (!charityExists || charityExists.length === 0) {
      return res.status(400).json({ message: 'Charity does not exist' });
    }

    let photoUrl = '';

    if (req.file) {
      const file = req.file;
      const uploadResponse = await cloudinary.v2.uploader.upload(file.path, {
        folder: 'food-donation/restaurant-donations',
      });

      if (!uploadResponse || !uploadResponse.secure_url) {
        return res.status(400).json({ message: 'Photo upload failed, URL is empty' });
      }

      photoUrl = uploadResponse.secure_url;
    }

    await db.insert(foodDonationTable).values({
      userId: userExists[0].Id,
      charityId: charityExists[0].charityId,
      restaurantName,
      foodItemName,
      quantity,
      category,
      description,
      streetAddress,
      barangay,
      city,
      province,
      pickupDate,
      specialInstructions,
      contactName,
      contactNumber,
      allergens,
      storageRequirements,
      status,
      photoUrl,
    });

    res.status(201).json({ message: 'Donation request created successfully' });
  } catch (error) {
    console.error('Error during food donation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateDonationRequest = async (req: Request, res: Response) => {
  const { donationId } = req.params;
  const {
    foodItemName,
    quantity,
    category,
    description,
    streetAddress,
    barangay,
    city,
    province,
    pickupDate,
    specialInstructions,
    contactName,
    contactNumber,
    allergens,
    storageRequirements,
    status,
    photoUrl,
  } = req.body;

  try {
    await db
      .update(foodDonationTable)
      .set({
        foodItemName,
        quantity,
        category,
        description,
        streetAddress,
        barangay,
        city,
        province,
        pickupDate,
        specialInstructions,
        contactName,
        contactNumber,
        allergens,
        storageRequirements,
        status,
        photoUrl,
      })
      .where(eq(foodDonationTable.donationId, parseInt(donationId)));

    res.status(200).json({ message: 'Donation request updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating donation request', error });
  }
};

export const deleteDonationRequest = async (req: Request, res: Response) => {
  const { donationId } = req.params;

  try {
    const donationExists = await db
      .delete(foodDonationTable)
      .where(eq(foodDonationTable.donationId, parseInt(donationId)));

    if (!donationExists) {
      return res.status(400).json({ message: 'Donation request does not exist' });
    }

    res.status(200).json({ message: 'Donation request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting donation request', error });
  }
};

export const viewDonationRequests = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const donations = await db
      .select({
        foodDonationTable,
        charityName: charityTable.charityName,
        email: charityTable.email,
        streetAddress: charityTable.streetAddress,
        barangay: charityTable.barangay,
        city: charityTable.city,
        province: charityTable.province,
        contactNumber: charityTable.contactNumber,
        status: foodDonationTable.status,
      })
      .from(foodDonationTable)
      .innerJoin(charityTable, eq(foodDonationTable.charityId, charityTable.charityId))
      .where(
        and(eq(foodDonationTable.userId, parseInt(userId)), eq(foodDonationTable.status, 'PENDING'))
      );

    res.status(200).json({ donations });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving donation requests', error });
  }
};

export const viewResDonationHistory = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const resDonationHistory = await db
      .select({
        donationId: foodDonationTable.donationId,
        restaurantName: foodDonationTable.restaurantName,
        foodItemName: foodDonationTable.foodItemName,
        quantity: foodDonationTable.quantity,
        category: foodDonationTable.category,
        description: foodDonationTable.description,
        address:
          sql`CONCAT(${foodDonationTable.streetAddress}, ', ', ${foodDonationTable.barangay}, ', ', ${foodDonationTable.city})`.as(
            'address'
          ),
        pickupDate: foodDonationTable.pickupDate,
        specialInstructions: foodDonationTable.specialInstructions,
        contactName: foodDonationTable.contactName,
        contactNumber: foodDonationTable.contactNumber,
        allergens: foodDonationTable.allergens,
        storageRequirements: foodDonationTable.storageRequirements,
        status: foodDonationTable.status,
        charityName: charityTable.charityName,
      })
      .from(foodDonationTable)
      .innerJoin(charityTable, eq(foodDonationTable.charityId, charityTable.charityId))
      .where(
        and(
          eq(foodDonationTable.userId, parseInt(userId)),
          or(eq(foodDonationTable.status, 'ACCEPTED'), eq(foodDonationTable.status, 'REJECTED'))
        )
      );

    res.status(200).json({ resDonationHistory });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving Restaurantdonation history', error });
  }
};

//RESTAURANT OVERVIEW
export const viewDonationStatusSummary = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const donationStatusSummary = await db
      .select({
        status: foodDonationTable.status,
        count: sql<number>`COUNT(*)`.as('count'),
      })
      .from(foodDonationTable)
      .where(
        and(
          eq(foodDonationTable.userId, parseInt(userId)),
          or(eq(foodDonationTable.status, 'ACCEPTED'), eq(foodDonationTable.status, 'REJECTED'))
        )
      )
      .groupBy(foodDonationTable.status);

    res.status(200).json({ donationStatusSummary });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving donation status summary',
      error,
    });
  }
};

export const viewTotalUsers = async (req: Request, res: Response) => {
  try {
    const totalUsers = await db
      .select({
        count: sql<number>`COUNT(*)`.as('count'),
      })
      .from(usersTable)
      .where(eq(usersTable.userType, 'RESTAURANT'));

    res.status(200).json({ totalUsers });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving total users', error });
  }
};

export const viewTotalCharities = async (req: Request, res: Response) => {
  try {
    const totalCharities = await db
      .select({
        count: sql<number>`COUNT(*)`.as('count'),
      })
      .from(charityTable);

    res.status(200).json({ totalCharities });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving total charities', error });
  }
};

export const viewTotalDonations = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const totalDonations = await db
      .select({
        count: sql<number>`COUNT(*)`.as('count'),
      })
      .from(foodDonationTable)
      .where(eq(foodDonationTable.userId, parseInt(userId)));

    res.status(200).json({ totalDonations });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving total donations', error });
  }
};

// export const getCurrentRestaurantUser = async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params;
//     const RestaurantUser = await db
//       .select()
//       .from(usersTable)
//       .where(and(eq(usersTable.Id, parseInt(userId)), eq(usersTable.userType, 'RESTAURANT')));

//     if (RestaurantUser.length === 0) {
//       return res.status(404).json({ message: 'Restaurant user not found' });
//     }
//     return res.status(200).json(RestaurantUser[0]);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: 'Error retrieving Restaurant user', error });
//   }
// };

// export const editRestaurantProfile = async (req: Request, res: Response) => {
//   const { restaurantId } = req.params;
//   const { restaurantName, streetAddress, barangay, city, province, contactNumber } = req.body;

//   try {
//     await db
//       .update(restaurantTable)
//       .set({
//         restaurantName,
//         streetAddress,
//         barangay,
//         city,
//         province,
//         contactNumber,
//       })
//       .where(eq(restaurantTable.restaurantId, parseInt(restaurantId)));

//     res.status(200).json({ message: 'Restaurant profile updated successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating restaurant profile', error });
//   }
// };

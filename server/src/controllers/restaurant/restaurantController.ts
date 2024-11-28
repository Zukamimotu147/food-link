import { db } from '../../drizzle/database/connection';
import { eq, and } from 'drizzle-orm';
import { NextFunction, Request, Response } from 'express';

import {
  restaurantTable,
  foodDonationTable,
  //   pickupScheduleTable,
  //   donationHistoryTable,
  charityTable,
  usersTable,
} from '../../drizzle/tableSchema';
import { char } from 'drizzle-orm/pg-core';

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
    photoUrl,
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

    // Insert the donation request
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

export const editRestaurantProfile = async (req: Request, res: Response) => {
  const { restaurantId } = req.params;
  const { restaurantName, streetAddress, barangay, city, province, contactNumber } = req.body;

  try {
    await db
      .update(restaurantTable)
      .set({
        restaurantName,
        streetAddress,
        barangay,
        city,
        province,
        contactNumber,
      })
      .where(eq(restaurantTable.restaurantId, parseInt(restaurantId)));

    res.status(200).json({ message: 'Restaurant profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating restaurant profile', error });
  }
};

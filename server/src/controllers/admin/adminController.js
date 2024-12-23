import { db } from '../../drizzle/database/connection.js';
import { charityTable, foodDonationTable, usersTable } from '../../drizzle/tableSchema.js';
import { eq, and, sql } from 'drizzle-orm';
import { cloudinary } from '../../config/cloudinary.js';

export const addCharity = async (req, res) => {
  const {
    charityName,
    streetAddress,
    barangay,
    city,
    province,
    contactNumber,
    email,
    charityDescription,
  } = req.body;

  try {
    const adminUserExist = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.userType, 'ADMIN'));

    if (adminUserExist.length === 0) {
      return res.status(400).json({ message: 'Admin user does not exist' });
    }

    const existingCharity = await db
      .select()
      .from(charityTable)
      .where(eq(charityTable.charityName, charityName));

    if (existingCharity.length > 0) {
      return res.status(400).json({ message: 'Charity already exists' });
    }

    let charityPhotoUrl = '';

    if (req.file) {
      const file = req.file;
      const uploadResponse = await cloudinary.v2.uploader.upload(file.path, {
        folder: 'food-donation/charity',
      });

      if (!uploadResponse || !uploadResponse.secure_url) {
        return res.status(400).json({ message: 'Photo upload failed, URL is empty' });
      }

      charityPhotoUrl = uploadResponse.secure_url;
    }

    await db.insert(charityTable).values({
      userId: adminUserExist[0].Id,
      charityDescription,
      charityName,
      streetAddress,
      barangay,
      city,
      province,
      contactNumber,
      email,
      charityPhotoUrl,
    });

    // io.emit('addCharity', addCharity);
    res.status(200).json({ message: 'Charity added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding charity', error });
  }
};

export const updateCharity = async (req, res) => {
  const { charityId } = req.params;
  const { charityName, streetAddress, barangay, city, province, contactNumber, email } = req.body;

  try {
    await db
      .update(charityTable)
      .set({
        charityName,
        streetAddress,
        barangay,
        city,
        province,
        contactNumber,
        email,
      })
      .where(eq(charityTable.charityId, parseInt(charityId)));

    res.status(200).json({ message: 'Charity updated successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating charity',
      error,
    });
  }
};

export const deleteCharity = async (req, res) => {
  const { charityId } = req.params;

  try {
    await db.delete(charityTable).where(eq(charityTable.charityId, parseInt(charityId)));

    res.status(200).json({ message: 'Charity deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting charity', error });
  }
};

export const getCharities = async (req, res) => {
  try {
    const charities = await db.select().from(charityTable);
    res.status(200).json(charities);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving charities', error });
  }
};

export const getDonationRequests = async (req, res) => {
  try {
    const donationRequests = await db
      .select({
        donationId: foodDonationTable.donationId,
        userId: foodDonationTable.userId,
        restaurantName: foodDonationTable.restaurantName,
        foodItemName: foodDonationTable.foodItemName,
        quantity: foodDonationTable.quantity,
        category: foodDonationTable.category,
        description: foodDonationTable.description,
        streetAddress: foodDonationTable.streetAddress,
        barangay: foodDonationTable.barangay,
        city: foodDonationTable.city,
        province: foodDonationTable.province,
        pickupDate: foodDonationTable.pickupDate,
        specialInstructions: foodDonationTable.specialInstructions,
        contactName: foodDonationTable.contactName,
        contactNumber: foodDonationTable.contactNumber,
        allergens: foodDonationTable.allergens,
        storageRequirements: foodDonationTable.storageRequirements,
        photoUrl: foodDonationTable.photoUrl,
        status: foodDonationTable.status,
        createdAt: foodDonationTable.createdAt,
        charityName: charityTable.charityName, // Join only the charityName
      })
      .from(foodDonationTable)
      .innerJoin(charityTable, eq(foodDonationTable.charityId, charityTable.charityId))
      .where(eq(foodDonationTable.status, 'PENDING'));

    res.status(200).json(donationRequests);
  } catch (error) {
    console.error('Error during getting donation requests:', error);
  }
};

export const approveDonation = async (req, res) => {
  const { donationId } = req.params;
  try {
    await db
      .update(foodDonationTable)
      .set({ status: 'ACCEPTED' })
      .where(eq(foodDonationTable.donationId, parseInt(donationId)));

    res.status(200).json({ message: 'Donation approved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error approving donation', error });
  }
};

export const rejectDonation = async (req, res) => {
  const { donationId } = req.params;
  try {
    await db
      .update(foodDonationTable)
      .set({ status: 'REJECTED' })
      .where(eq(foodDonationTable.donationId, parseInt(donationId)));

    res.status(200).json({ message: 'Donation rejected successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting donation', error });
  }
};

export const getAdminDonationHistory = async (req, res) => {
  try {
    const donations = await db
      .select({
        donationId: foodDonationTable.donationId,
        userId: foodDonationTable.userId,
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
        photoUrl: foodDonationTable.photoUrl,
        status: foodDonationTable.status,
        createdAt: foodDonationTable.createdAt,
      })
      .from(foodDonationTable);
    //   .where(
    //     and(eq(foodDonationTable.status, 'ACCEPTED'), eq(foodDonationTable.status, 'REJECTED'))
    //   );
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving donation history', error });
  }
};

// export const getCurrentAdminUser = async (req: Request, res: Response): Promise<Response> => {
//   try {
//     const { userId } = req.params;
//     console.log('Received userId:', userId);

//     const adminUser = await db
//       .select()
//       .from(usersTable)
//       .where(and(eq(usersTable.Id, parseInt(userId)), eq(usersTable.userType, 'ADMIN')));

//     if (adminUser.length === 0) {
//       return res.status(404).json({ message: 'Admin user not found' });
//     }

//     return res.status(200).json(adminUser[0]);
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({ message: 'Error retrieving admin user', error });
//   }
// };

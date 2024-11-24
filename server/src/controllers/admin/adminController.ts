import { Request, Response } from 'express';
import { db } from '../../drizzle/database/connection';
import { charityTable, foodDonationTable, usersTable } from '../../drizzle/tableSchema';
import { eq, and } from 'drizzle-orm';

export const addCharity = async (req: Request, res: Response) => {
  const { charityName, streetAddress, barangay, city, province, contactNumber, email } = req.body;

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

    await db.insert(charityTable).values({
      userId: adminUserExist[0].Id,
      charityName,
      streetAddress,
      barangay,
      city,
      province,
      contactNumber,
      email,
    });

    // io.emit('addCharity', addCharity);
    res.status(200).json({ message: 'Charity added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding charity', error });
  }
};

export const updateCharity = async (req: Request, res: Response) => {
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

export const deleteCharity = async (req: Request, res: Response) => {
  const { charityId } = req.params;

  try {
    await db.delete(charityTable).where(eq(charityTable.charityId, parseInt(charityId)));

    res.status(200).json({ message: 'Charity deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting charity', error });
  }
};

export const getCharities = async (req: Request, res: Response) => {
  try {
    const charities = await db.select().from(charityTable);
    res.status(200).json(charities);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving charities', error });
  }
};

export const approveDonation = async (req: Request, res: Response) => {
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

export const rejectDonation = async (req: Request, res: Response) => {
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

export const getDonationHistory = async (req: Request, res: Response) => {
  try {
    const donations = await db.select().from(foodDonationTable);
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving donation history', error });
  }
};

export const getCurrentAdminUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId } = req.params;
    console.log('Received userId:', userId);

    const adminUser = await db
      .select()
      .from(usersTable)
      .where(and(eq(usersTable.Id, parseInt(userId)), eq(usersTable.userType, 'ADMIN')));

    if (adminUser.length === 0) {
      return res.status(404).json({ message: 'Admin user not found' });
    }

    return res.status(200).json(adminUser[0]);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: 'Error retrieving admin user', error });
  }
};

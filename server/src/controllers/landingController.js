import { db } from '../drizzle/database/connection.js';
import { contactTable } from '../drizzle/tableSchema.js';
import { eq } from 'drizzle-orm';

export const contactController = async (req, res) => {
  const { email, firstname, lastname, message } = req.body;
  try {
    const existingContact = await db
      .select()
      .from(contactTable)
      .where(eq(contactTable.email, email));
    if (existingContact.length > 0) {
      return res.status(400).json({ message: 'Contact already exists' });
    }
    await db.insert(contactTable).values({ email, firstname, lastname, message });
    res.status(200).json({ message: 'Contact Information submitted successfully' });
  } catch (error) {
    console.error('Error during contact submission:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

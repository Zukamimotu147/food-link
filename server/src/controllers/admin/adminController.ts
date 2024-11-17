import { db } from '../../drizzle/database/connection';
import { usersTable } from '../../drizzle/tableSchema';

export const getAllUsers = async (req: any, res: any) => {
  try {
    const users = await db.select().from(usersTable);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

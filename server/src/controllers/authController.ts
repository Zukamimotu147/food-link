import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../drizzle/database/connection';
import { eq } from 'drizzle-orm';
import { usersTable } from '../drizzle/tableSchema';

export const register = async (req: Request, res: Response): Promise<Response> => {
  const { name, email, password, userType } = req.body;

  try {
    const existingUser = await db
      .select({ email: usersTable.email })
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'User  already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.insert(usersTable).values({ name, email, password: hashedPassword, userType });

    const responseMessage = { message: 'User  registered successfully' };
    console.log('Response:', responseMessage);
    return res.status(201).json(responseMessage);
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  try {
    const user = await db
      .select({
        id: usersTable.Id,
        email: usersTable.email,
        password: usersTable.password,
        role: usersTable.userType,
      })
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (user.length === 0) {
      return res.status(404).json({ message: 'User  not found' });
    }

    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user[0].id, password: user[0].password, role: user[0].role },
      process.env.JWT_SECRET!,
      {
        expiresIn: '1d',
      }
    );
    return res.status(200).json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

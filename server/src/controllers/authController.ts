import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../drizzle/database/connection';
import { eq } from 'drizzle-orm';
import { usersTable } from '../drizzle/tableSchema';

export const register = async (req: Request, res: Response): Promise<Response> => {
  const { name, email, password, userType } = req.body;

  const existingUser = await db
    .select({ email: usersTable.email })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (existingUser.length > 0) {
    return res.status(400).json({ message: 'User  already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.insert(usersTable).values({ name, email, password: hashedPassword, userType });

  return res.status(201).json({ message: 'User  registered successfully' });
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;
  const user = await db
    .select({ email: usersTable.email, password: usersTable.password })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (user.length === 0) {
    return res.status(404).json({ message: 'User  not found' });
  }

  const isMatch = await bcrypt.compare(password, user[0].password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user[0].email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  return res.status(200).json({ token });
};

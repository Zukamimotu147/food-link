import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../drizzle/database/connection.js';
import { eq } from 'drizzle-orm';
import { usersTable } from '../drizzle/tableSchema.js';

import { generateToken } from '../services/generateToken.js';

export const register = async (req, res) => {
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

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db
      .select({
        Id: usersTable.Id,
        email: usersTable.email,
        name: usersTable.name,
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

    const token = generateToken(user);

    return res.status(200).json({
      token,
      user: {
        userId: user[0].Id,
        name: user[0].name,
        email: user[0].email,
        role: user[0].role,
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

import jwt from 'jsonwebtoken';

export const generateToken = (user: any) => {
  return jwt.sign(
    {
      userId: user[0]?.Id,
      password: user[0]?.password,
      googleId: user[0]?.googleId,
      email: user[0]?.email,
      role: user[0]?.role,
    },
    process.env.JWT_SECRET!,
    { expiresIn: '1d' }
  );
};

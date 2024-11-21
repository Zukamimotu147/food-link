import * as zod from 'zod';

export const registerAuthSchema = zod
  .object({
    email: zod.string().email({
      message: 'Please enter a valid email',
    }),
    name: zod.string().min(3, { message: 'Name must be at least 3 characters' }),
    password: zod.string().min(8, {
      message: 'Password must be at least 8 characters',
    }),
    confirmPassword: zod.string().min(8, { message: 'Please confirm your password' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const loginAuthSchema = zod.object({
  email: zod.string().email({ message: 'Please enter a valid email' }),
  password: zod.string().min(8, { message: 'Password must be at least 8 characters' }),
});

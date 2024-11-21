import * as z from 'zod';

export const contactSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  message: z
    .string()
    .min(3, { message: 'Message must be at least 3 characters' })
    .max(1000, { message: 'Message must be less than 1000 characters' }),
  firstname: z.string().min(1, { message: 'Firstname must be at least 1 characters' }),
  lastname: z.string().min(1, { message: 'Lastname must be at least 1 characters' }),
});

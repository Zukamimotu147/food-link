import * as z from 'zod';

export const addCharitySchema = z.object({
  //   userId: z.number().int().positive({ message: 'User ID must be a positive integer' }),
  charityName: z.string().min(1, { message: 'Charity name is required' }),
  charityDescription: z.string().min(1, { message: 'Charity description is required' }),
  streetAddress: z.string().min(1, { message: 'Street address is required' }),
  barangay: z.string().min(1, { message: 'Barangay is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  province: z.string().min(1, { message: 'Province is required' }),
  contactNumber: z
    .string()
    .regex(/^\d{11}$/, { message: 'Invalid contact number' })
    .min(1, { message: 'Contact number is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  charityPhotoUrl: z.string().url({ message: 'Charity photo URL must be a valid URL' }),
});

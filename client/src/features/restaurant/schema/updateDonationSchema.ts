import * as z from 'zod';

export const updateDonationSchema = z.object({
  restaurantName: z.string().min(1, { message: 'Restaurant name is required' }),
  foodItemName: z.string().min(1, { message: 'Food item name is required' }),
  quantity: z.number().int().positive({ message: 'Quantity must be a positive integer' }),
  category: z.string().min(1, { message: 'Category is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  streetAddress: z.string().min(1, { message: 'Street address is required' }),
  barangay: z.string().min(1, { message: 'Barangay is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  province: z.string().min(1, { message: 'Province is required' }),
  pickupDate: z.date().min(new Date(), { message: 'Pickup date must be in the future' }),
  specialInstructions: z.string().min(1, { message: 'Special instructions are required' }),
  contactName: z.string().min(1, { message: 'Contact name is required' }),
  contactNumber: z
    .string()
    .regex(/^[0-9()+\- ]+$/, {
      message: 'Contact number must contain only numbers and valid symbols',
    })
    .min(1, { message: 'Contact number is required' }),
  allergens: z.string().min(1, { message: 'Allergens are required' }),
  storageRequirements: z.string().min(1, { message: 'Storage requirements are required' }),
  photoUrl: z.string().url({ message: 'Photo URL must be a valid URL' }),
  charity: z.string().min(1, { message: 'Charity is required' }),
});

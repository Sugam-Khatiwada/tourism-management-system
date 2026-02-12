import {z} from 'zod';

export const createGuideschema = z.object({
    user: z.string().min(1, "User ID is required"),
    bio: z.string().min(1, "Bio is required"),
    languages: z.array(z.string()).min(1, "Languages are required"),
    pricePerDay: z.number().min(1, "Price per day is required"),
    availableDates: z.array(z.date()).min(1, "Available dates are required"),
    rating: z.number().min(1, "Rating is required"),
});

export const updateGuideSchema = z.object({
    user: z.string().min(1, "User ID is required").optional(),
    bio: z.string().min(1, "Bio is required").optional(),
    languages: z.array(z.string()).min(1, "Languages are required").optional(),
    pricePerDay: z.number().min(1, "Price per day is required").optional(),
    availableDates: z.array(z.date()).min(1, "Available dates are required").optional(),
    rating: z.number().min(1, "Rating is required").optional(),
});

export type CreateGuideDto = z.infer<typeof createGuideschema>;
export type UpdateGuideDto = z.infer<typeof updateGuideSchema>;
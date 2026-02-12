import {z} from 'zod';

export const createHotelSchema = z.object({
    owner: z.string().min(1, "Owner ID is required"),
    name: z.string().min(1, "Hotel name is required"),
    location: z.string().min(1, "Hotel location is required"),
    room: z.array(z.object({
        roomNumber: z.string().min(1, "Room number is required"),
        price: z.number().positive("Price must be a positive number"),
        capacity: z.number().positive("Capacity must be a positive number"),
        isAvailable: z.boolean().default(false),
    })),
});

export const updateHotelSchema = z.object({
    owner: z.string().min(1, "Owner ID is required").optional(),
    name: z.string().min(1, "Hotel name is required").optional(),
    location: z.string().min(1, "Hotel location is required").optional(),
    room: z.array(z.object({
        roomNumber: z.string().min(1, "Room number is required"),
        price: z.number().positive("Price must be a positive number"),
        capacity: z.number().positive("Capacity must be a positive number"),
        isAvailable: z.boolean().default(false),
    })).optional(),
});

export type CreateHotelDto = z.infer<typeof createHotelSchema>;
export type UpdateHotelDto = z.infer<typeof updateHotelSchema>;
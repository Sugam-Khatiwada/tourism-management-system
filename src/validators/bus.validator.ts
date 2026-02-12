import { z } from "zod";

export const createBusSchema = z.object({
    owner: z.string().min(1, "Owner is required"),
    busName: z.string().min(1, "Bus name is required"),
    routeFrom: z.string().min(1, "Route from is required"),
    routeTo: z.string().min(1, "Route to is required"),
    departureTime: z.date(),
    seats: z.number().min(1, "Seats are required"),
    price: z.number().min(1, "Price is required"),
});

export const updateBusSchema = z.object({
    owner: z.string().min(1, "Owner is required").optional(),
    busName: z.string().min(1, "Bus name is required").optional(),
    routeFrom: z.string().min(1, "Route from is required").optional(),
    routeTo: z.string().min(1, "Route to is required").optional(),
    departureTime: z.date().optional(),
    seats: z.number().min(1, "Seats are required").optional(),
    price: z.number().min(1, "Price is required").optional(),
});

export type CreateBusDto = z.infer<typeof createBusSchema>;
export type UpdateBusDto = z.infer<typeof updateBusSchema>;
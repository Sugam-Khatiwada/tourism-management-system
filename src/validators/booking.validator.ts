import { z } from "zod";

export const createBookingSchema = z.object({
    user: z.string().min(1, "User ID is required"),
    bookingType: z.enum(["hotel", "bus", "guide"], "Invalid booking type"),
    referenceId: z.string().min(1, "Reference ID is required"),
    amount: z.number().min(1, "Amount is required"),
    status: z.enum(["pending", "confirmed", "cancelled"], "Invalid booking status"),
    paymentStatus: z.enum(["pending", "paid"], "Invalid payment status"),
});

export const updateBookingSchema = z.object({
    user: z.string().min(1, "User ID is required").optional(),
    bookingType: z.enum(["hotel", "bus", "guide"], "Invalid booking type").optional(),
    referenceId: z.string().min(1, "Reference ID is required").optional(),
    amount: z.number().min(1, "Amount is required").optional(),
    status: z.enum(["pending", "confirmed", "cancelled"], "Invalid booking status").optional(),
    paymentStatus: z.enum(["pending", "paid"], "Invalid payment status").optional(),
});

export type CreateBookingDto = z.infer<typeof createBookingSchema>;
export type UpdateBookingDto = z.infer<typeof updateBookingSchema>;
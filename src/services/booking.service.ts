import { BookingRepository } from "@/repositories/booking.repository";

async function createBooking(data: any) {
    const booking = await BookingRepository.create(data);
    return booking;
}

async function confirmBooking(id: string) {
    const booking = await BookingRepository.updateStatus(id, "confirmed", "paid");
    return booking;
}

async function cancelBooking(id: string) {
    const booking = await BookingRepository.updateStatus(id, "cancelled", "unpaid");
    return booking;
}

export const bookingService = {
    createBooking,
    confirmBooking,
    cancelBooking,
};
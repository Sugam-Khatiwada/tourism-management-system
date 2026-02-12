import Booking, {type IBooking} from "@/models/booking.model";
import { connectDB } from "@/lib/db";
import { CreateBookingDto, UpdateBookingDto } from "@/validators/booking.validator";

async function create(data: CreateBookingDto): Promise<IBooking> {
    await connectDB();
    const booking = await Booking.create(data);
    return booking;
}

async function findById(id: string): Promise<IBooking | null> {
    await connectDB();
    const booking = await Booking.findById(id);
    return booking;
}

async function update(id: string, data: UpdateBookingDto): Promise<IBooking | null> {
    await connectDB();
    const booking = await Booking.findByIdAndUpdate(id, data, { new: true });
    return booking;
}

async function get(): Promise<IBooking[]> {
    await connectDB();
    const bookings = await Booking.find();
    return bookings;
}

async function remove(id: string): Promise<IBooking | null> {
    await connectDB();
    const booking = await Booking.findByIdAndDelete(id);
    return booking;
}

export const BookingRepository = {
    create,
    findById,
    update,
    get,
    remove,
};
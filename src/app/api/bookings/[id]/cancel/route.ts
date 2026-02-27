import { NextResponse } from "next/server";
import { BookingRepository } from "@/repositories/booking.repository";
import { requireRole } from "@/lib/auth";
import { bookingService } from "@/services/booking.service";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(_request: Request, { params }: RouteContext) {
    try {
        await requireRole(["tourist"]);
        const bookingId = await params;
        const existingBooking = await BookingRepository.findById(bookingId.id);
        if (!existingBooking) {
            return NextResponse.json({ error: "Booking not found" }, { status: 404 });
        }
        const cancelledBooking = await bookingService.cancelBooking(bookingId.id);
        return NextResponse.json(cancelledBooking, { status: 200 });
    } catch (err) {
        console.error(err);
        if (err instanceof Error && err.message === "Unauthorized") {
            return NextResponse.json({ error: err.message }, { status: 401 });
        }
        if (err instanceof Error && err.message === "Forbidden") {
            return NextResponse.json({ error: err.message }, { status: 403 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

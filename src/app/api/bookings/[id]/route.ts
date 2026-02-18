import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { UpdateBookingDto, updateBookingSchema } from "@/validators/booking.validator";
import { BookingRepository } from "@/repositories/booking.repository";
import { requireRole } from "@/lib/auth";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, {params}: RouteContext) {
    try {
        const bookingId = await params;
        const booking = await BookingRepository.findById(bookingId.id);
        if (!booking) {
            return NextResponse.json({ error: "Booking not found" }, { status: 404 });
        }
        return NextResponse.json(booking, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(request: Request, {params}: RouteContext) {
    try {
        await requireRole(["tourist"])
        const bookingId = await params;
        const body = await request.json();
        const parseResult = await updateBookingSchema.safeParseAsync(body);
        if (!parseResult.success) {
            return NextResponse.json({ error: parseResult.error.message }, { status: 400 });
        }
        const existingBooking = await BookingRepository.findById(bookingId.id);
        if (!existingBooking) {
            return NextResponse.json({ error: "Booking not found" }, { status: 404 });
        }
        const updatePayload: UpdateBookingDto = parseResult.data;
        const updatedBooking = await BookingRepository.update(bookingId.id, updatePayload);
        return NextResponse.json(updatedBooking, { status: 200 });
    } catch (err) {
        console.error(err);
        if (err instanceof ZodError) {
            return NextResponse.json({ error: err.message }, { status: 400 });
        }
        if (err instanceof Error && err.message === "Unauthorized") {
            return NextResponse.json({ error: err.message }, { status: 401 });
        }
        if (err instanceof Error && err.message === "Forbidden") {
            return NextResponse.json({ error: err.message }, { status: 403 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request: Request, {params}: RouteContext) {
    try {
        await requireRole(["tourist"])
        const bookingId = await params;
        const existingBooking = await BookingRepository.findById(bookingId.id);
        if (!existingBooking) {
            return NextResponse.json({ error: "Booking not found" }, { status: 404 });
        }
        await BookingRepository.remove(bookingId.id);
        return NextResponse.json({ message: "Booking deleted successfully" }, { status: 200 });
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
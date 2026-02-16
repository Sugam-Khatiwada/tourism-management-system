import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { CreateBookingDto, createBookingSchema } from "@/validators/booking.validator";
import { BookingRepository } from "@/repositories/booking.repository";
import { requireRole } from "@/lib/auth";

export async function POST(request: Request) {  
    try {
        await requireRole(["tourist"])
        const body = await request.json();
        const createBookingDto: CreateBookingDto = await createBookingSchema.parseAsync(body);
        const createdBooking = await BookingRepository.create(createBookingDto);
        return NextResponse.json(createdBooking, { status: 201 });
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
        if (err instanceof Error && err.message.includes("already exists")) {
            return NextResponse.json({ error: err.message }, { status: 409 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const bookings = await BookingRepository.get();
        return NextResponse.json(bookings, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
     }      
}
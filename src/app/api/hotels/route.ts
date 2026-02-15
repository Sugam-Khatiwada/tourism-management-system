import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { CreateHotelDto, createHotelSchema } from "@/validators/hotel.validator";
import { HotelRepository } from "@/repositories/hotel.repository";
import { requireRole } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        await requireRole(["hotel_owner"])
        const body = await request.json();
        const createHotelDto: CreateHotelDto = await createHotelSchema.parseAsync(body);
        const createdHotel = await HotelRepository.create(createHotelDto);
        return NextResponse.json(createdHotel, { status: 201 });
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
        const hotels = await HotelRepository.get();
        return NextResponse.json(hotels, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
     }
}
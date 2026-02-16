import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { UpdateHotelDto, updateHotelSchema } from "@/validators/hotel.validator";
import { HotelRepository } from "@/repositories/hotel.repository";
import { requireRole } from "@/lib/auth";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, {params}: RouteContext) {
    try {
        const hotelId = await params;
        const hotel = await HotelRepository.findById(hotelId.id);
                if (!hotel) {
            return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
        }
        return NextResponse.json(hotel, { status: 200 });
    } catch (err) {
        console.error(err); 
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(request: Request, {params}: RouteContext) {
    try {
        await requireRole(["hotel_owner"])
        const hotelId = await params;
        const body = await request.json();
        const parseResult = await updateHotelSchema.safeParseAsync(body);
        if (!parseResult.success) {
            return NextResponse.json({ error: parseResult.error.message }, { status: 400 });
        }

        const existingHotel = await HotelRepository.findById(hotelId.id);
        if (!existingHotel) {
            return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
        }

        const updatePayload: UpdateHotelDto = parseResult.data;
        const updatedHotel = await HotelRepository.update(hotelId.id, updatePayload);
        return NextResponse.json(updatedHotel, { status: 200 });
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
        await requireRole(["hotel_owner"])
        const hotelId = await params;
        const deletedHotel = await HotelRepository.remove(hotelId.id);
        if (!deletedHotel) {
            return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Hotel deleted successfully" }, { status: 200 });
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
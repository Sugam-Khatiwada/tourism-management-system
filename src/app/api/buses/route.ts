import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { CreateBusDto, createBusSchema } from "@/validators/bus.validator";
import { busRepository } from "@/repositories/bus.repository";
import { requireRole } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        await requireRole(["bus_owner"])
        const body = await request.json();
        const createBusDto: CreateBusDto = await createBusSchema.parseAsync(body);
        const createdBus = await busRepository.create(createBusDto);
        return NextResponse.json(createdBus, { status: 201 });
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
        const buses = await busRepository.get();
        return NextResponse.json(buses, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
     }
}
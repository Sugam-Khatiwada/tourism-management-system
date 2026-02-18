import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { UpdateBusDto, updateBusSchema } from "@/validators/bus.validator";
import { busRepository } from "@/repositories/bus.repository";
import { requireRole } from "@/lib/auth";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, {params}: RouteContext) {
    try {
        const busId = await params;
        const bus = await busRepository.findById(busId.id);
        if (!bus) {
            return NextResponse.json({ error: "Bus not found" }, { status: 404 });
        }
        return NextResponse.json(bus, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(request: Request, {params}: RouteContext) {
    try {
        await requireRole(["bus_owner"])
        const busId = await params;
        const body = await request.json();
        const parseResult = await updateBusSchema.safeParseAsync(body);
        if (!parseResult.success) {
            return NextResponse.json({ error: parseResult.error.message }, { status: 400 });
        }
        const existingBus = await busRepository.findById(busId.id);
        if (!existingBus) {
            return NextResponse.json({ error: "Bus not found" }, { status: 404 });
        }
        const updatePayload: UpdateBusDto = parseResult.data;
        const updatedBus = await busRepository.update(busId.id, updatePayload);
        return NextResponse.json(updatedBus, { status: 200 });
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
        await requireRole(["bus_owner"])
        const busId = await params;
        const existingBus = await busRepository.findById(busId.id);
        if (!existingBus) {
            return NextResponse.json({ error: "Bus not found" }, { status: 404 });
        }
        await busRepository.remove(busId.id);
        return NextResponse.json({ message: "Bus deleted successfully" }, { status: 200 });
    }
    catch (err) {
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
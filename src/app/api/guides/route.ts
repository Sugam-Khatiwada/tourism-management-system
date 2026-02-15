import { GuideRepository } from "@/repositories/guide.repository";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { CreateGuideDto, createGuideschema } from "@/validators/guide.validator";
import { requireRole } from "@/lib/auth";


export async function POST(request: Request) {
    try {
        await requireRole(["guide"])
        const body = await request.json();
        const createGuideDto: CreateGuideDto = await createGuideschema.parseAsync(body);
        const createdGuide = await GuideRepository.create(createGuideDto);
        return NextResponse.json(createdGuide, { status: 201 });
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
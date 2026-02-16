import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { UpdateGuideDto, updateGuideSchema } from "@/validators/guide.validator";
import { GuideRepository } from "@/repositories/guide.repository";
import { requireRole } from "@/lib/auth";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, {params}: RouteContext) {
    try {
        const guideId = await params;
        const guide = await GuideRepository.findById(guideId.id);
                if (!guide) {
            return NextResponse.json({ error: "Guide not found" }, { status: 404 });
        }
        return NextResponse.json(guide, { status: 200 });
    } catch (err) {
        console.error(err); 
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function PUT(request: Request, {params}: RouteContext) {
    try {
        await requireRole(["guide"])
        const guideId = await params;
        const body = await request.json();
        const parseResult = await updateGuideSchema.safeParseAsync(body);
        if (!parseResult.success) {
            return NextResponse.json({ error: parseResult.error.message }, { status: 400 });
        }

        const existingGuide = await GuideRepository.findById(guideId.id);
        if (!existingGuide) {
            return NextResponse.json({ error: "Guide not found" }, { status: 404 });
        }

        const updatePayload: UpdateGuideDto = parseResult.data;
        const updatedGuide = await GuideRepository.update(guideId.id, updatePayload);
        return NextResponse.json(updatedGuide, { status: 200 });
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
        await requireRole(["guide"])
        const guideId = await params;
        const deletedGuide = await GuideRepository.remove(guideId.id);
        if (!deletedGuide) {
            return NextResponse.json({ error: "Guide not found" }, { status: 404 });
        }
        return NextResponse.json(deletedGuide, { status: 200 });
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
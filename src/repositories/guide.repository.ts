import Guide , {type IGuide } from "@/models/guide.model";
import { connectDB } from "@/lib/db";
import { CreateGuideDto, UpdateGuideDto } from "@/validators/guide.validator";

async function create(data: CreateGuideDto): Promise<IGuide> {
    await connectDB();
    const guide = await Guide.create(data);
    return guide;
}

async function findById(id: string): Promise<IGuide | null> {
    await connectDB();
    const guide = await Guide.findById(id);
    return guide;
}

async function update(id: string, data: UpdateGuideDto): Promise<IGuide | null> {
    await connectDB();
    const guide = await Guide.findByIdAndUpdate(id, data, { new: true });
    return guide;
}

async function get(): Promise<IGuide[]> {
    await connectDB();
    const guides = await Guide.find();
    return guides;
}

async function remove(id: string): Promise<IGuide> {
    await connectDB();
    const guide = await Guide.findByIdAndDelete(id);
    return guide;
}

export const GuideRepository = {
    create,
    findById,
    update,
    get,
    remove,
};
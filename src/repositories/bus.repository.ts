import Bus,{type IBus} from "@/models/bus.model";
import { connectDB } from "@/lib/db";
import { CreateBusDto, UpdateBusDto } from "@/validators/bus.validator";

async function create(data: CreateBusDto): Promise<IBus> {
    await connectDB();
    const bus = await Bus.create(data);
    return bus;
}

async function update(id: string, data: UpdateBusDto): Promise<IBus | null> {
    await connectDB();
    const bus = await Bus.findByIdAndUpdate(id, data, { new: true });
    return bus;
}

async function remove(id: string): Promise<IBus | null> {
    await connectDB();
    const bus = await Bus.findByIdAndDelete(id);
    return bus;
}

async function findById(id: string): Promise<IBus | null> {
    await connectDB();
    const bus = await Bus.findById(id);
    return bus;
}

async function get(): Promise<IBus[]> {
    await connectDB();
    const buses = await Bus.find();
    return buses;
}

export const busRepository = {
    create,
    update,
    remove,
    findById,
    get,
};
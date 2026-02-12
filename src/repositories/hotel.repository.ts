import Hotel,{type IHotel} from "@/models/hotel.model";
import { connectDB } from "@/lib/db";
import { CreateHotelDto, UpdateHotelDto } from "@/validators/hotel.validator";

async function create(data: CreateHotelDto): Promise<IHotel> {
    await connectDB();
    const hotel = await Hotel.create(data);
    return hotel;
}

async function findById(id: string): Promise<IHotel | null> {
    await connectDB();
    const hotel = await Hotel.findById(id);
    return hotel;
}

async function update(id: string, data: UpdateHotelDto): Promise<IHotel | null> {
    await connectDB();
    const hotel = await Hotel.findByIdAndUpdate(id, data, { new: true });
    return hotel;
}

async function get(): Promise<IHotel[]> {
    await connectDB();
    const hotels = await Hotel.find();
    return hotels;
}

async function remove(id: string): Promise<IHotel> {
    await connectDB();
    const hotel = await Hotel.findByIdAndDelete(id);
    return hotel;
}

export const HotelRepository = {
    create,
    findById,
    update,
    get,
    remove,
};
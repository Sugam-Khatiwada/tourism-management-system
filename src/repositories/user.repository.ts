import User, { type IUser } from "@/models/user.model";
import { CreateUserDto, UpdateUserDto } from "@/validators/user.validator";
import { connectDB } from "@/lib/db";

async function create(data: CreateUserDto): Promise<IUser> {
    await connectDB();
    const user = await User.create(data);
    return user;
}

async function findById(id: string): Promise<IUser | null> {
    await connectDB();
    const user = await User.findById(id);
    return user;
}

async function findByEmail(email: string): Promise<IUser | null> {
    await connectDB();
    const user = await User.findOne({ email });
    return user;
}

async function update(id: string, data: UpdateUserDto): Promise<IUser | null> {
    await connectDB();
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    return user;
}

async function get(): Promise<IUser[]> {
    await connectDB();
    const users = await User.find();
    return users;
}

async function remove(id: string): Promise<IUser> {
    await connectDB();
    const user = await User.findByIdAndDelete(id);
    return user;
}

export const UserRepository = {
    create,
    findById,
    findByEmail,
    update,
    get,
    remove,
};
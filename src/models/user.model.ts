import mongoose, { Document, Schema } from "mongoose";

export enum UserRole {
    ADMIN = "admin",
    TOURIST = "tourist",  
    GUIDE = "guide",
    HOTEL_OWNER = "hotel_owner",
    BUS_OWNER = "bus_owner"
}

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    }

const UserSchema: Schema = new Schema<IUser>(   
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, required: true, enum: Object.values(UserRole) },
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
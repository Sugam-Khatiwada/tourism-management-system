import mongoose, { Document, Schema } from "mongoose";

interface Room {
  roomNumber: string;
  price: number;
  capacity: number;
  isAvailable: boolean;
}

export interface IHotel extends Document {
  owner: mongoose.Types.ObjectId;
  name: string;
  location: string;
  rooms: Room[];
  createdAt: Date;
  updatedAt: Date;
}

const RoomSchema = new Schema<Room>(
    {
        roomNumber: { type: String, required: true },
        price: { type: Number, required: true },
        capacity: { type: Number, required: true },
        isAvailable: { type: Boolean, required: true, default: false },
    },
    { _id: false }
);

const HotelSchema: Schema = new Schema<IHotel>(
    {
        owner: { type: mongoose.Types.ObjectId, ref: "User", required: true },
        name: { type: String, required: true },
        location: { type: String, required: true },
        rooms: [RoomSchema],
    },
    { timestamps: true }
);

const Hotel = mongoose.models.Hotel || mongoose.model<IHotel>("Hotel", HotelSchema);
export default Hotel;
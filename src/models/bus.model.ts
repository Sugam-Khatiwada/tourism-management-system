import mongoose, { Document, Schema } from "mongoose";

export interface IBus extends Document {
  owner: mongoose.Types.ObjectId;
  busName: string;
  routeFrom: string;
  routeTo: string;
  departureTime: Date;
  seats: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

const BusSchema = new Schema<IBus>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    busName: String,
    routeFrom: String,
    routeTo: String,
    departureTime: Date,
    seats: Number,
    price: Number,
  },
  { timestamps: true }
);

const Bus = mongoose.models.Bus || mongoose.model<IBus>("Bus", BusSchema);
export default Bus;
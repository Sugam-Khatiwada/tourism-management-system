import mongoose, {Document, Schema} from "mongoose";

export type BookingType = "hotel" | "bus" | "guide";

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export interface IBooking extends Document {
  user: mongoose.Types.ObjectId;
  bookingType: BookingType;
  referenceId: mongoose.Types.ObjectId;
  amount: number;
  status: BookingStatus;
  paymentStatus: "pending" | "paid";
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema = new Schema<IBooking>( 
    {
        user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
        bookingType: { type: String, required: true, enum: ["hotel", "bus", "guide"] },
        referenceId: { type: mongoose.Types.ObjectId, required: true },
        amount: { type: Number, required: true },
        status: { type: String, required: true, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
        paymentStatus: { type: String, required: true, enum: ["pending", "paid"], default: "pending" },
    },
    { timestamps: true }
);

const Booking = mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);
export default Booking;
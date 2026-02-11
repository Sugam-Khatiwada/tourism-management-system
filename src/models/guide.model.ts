import mongoose, { Document, Schema} from "mongoose";

export interface IGuide extends Document {
    user: mongoose.Types.ObjectId;
    bio: string;
    languages: string[];
    pricePerDay: number;
    availableDates: Date[];
    rating: number;
    createdAt: Date;
    updatedAt: Date;
}

const GuideSchema: Schema = new Schema<IGuide>(
    {
        user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
        bio: { type: String, required: true },
        languages: [{ type: String, required: true }],
        pricePerDay: { type: Number, required: true },
        availableDates: [{ type: Date, required: true }],
        rating: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const Guide = mongoose.models.Guide || mongoose.model<IGuide>("Guide", GuideSchema);
export default Guide;
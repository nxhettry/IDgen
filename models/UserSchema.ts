import { Schema, Document, mongoose } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IUser extends Document {
  email: string;
  password: string | null;
  provider: "email" | "google" | null;
  isPremium: boolean;
}

const userSchema = new Schema(
  {
    UID: {
      type: String,
      default: uuidv4(),
    },
    email: { type: String, required: true },
    password: { type: String, default: null },
    isPremium: { type: Boolean, default: false },
    provider: { type: String, default: null },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;

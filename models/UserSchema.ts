import { Schema, Document, mongoose } from "mongoose";
import { ExcelDataType } from "@/components/ui/table/Table";
import { v4 as uuidv4 } from "uuid";

export interface IUser extends Document {
  email: string;
  password: string;
  data: ExcelDataType[];
}

const userSchema = new Schema(
  {
    UID: {
      type: String,
      default: uuidv4(),
    },
    email: { type: String, required: true },
    password: { type: String, required: true },
    data: {
      type: [],
      timeStamp: { type: Date, default: Date.now },
    },
  },
  { timestamps: true }
);

export const User =
  mongoose.model<IUser>("User", userSchema) || mongoose.models.User;

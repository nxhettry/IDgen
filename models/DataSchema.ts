import mongoose, { Schema, Document, Model } from "mongoose";
import { ExcelDataType } from "@/components/ui/table/Table";

export interface IData extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  sheetName: string;
  data: {
    [key: string]: ExcelDataType[];
  };
  createdAt: Date;
}

const DataSchema: Schema = new Schema<IData>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  sheetName: { type: String, required: true },
  data: { type: Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
});

const Data: Model<IData> =
  mongoose.models.Data || mongoose.model<IData>("Data", DataSchema);

export default Data;

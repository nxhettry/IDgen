import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Data from "@/models/DataSchema";
import { url } from "node:inspector";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const _id = searchParams.get("_id");

  try {
    if (!_id) {
      return NextResponse.json({ status: 400, message: "Some error occured" });
    }

    await connectDB();

    const res = await Data.find({ userId: _id });

    if (!res) {
      return NextResponse.json({ status: 400, message: "No data found" });
    }

    return NextResponse.json({ status: 200, message: res });
  } catch (error) {
    console.log("Error in the schoolget ", error);
    return NextResponse.json({ status: 404, message: "Internal server error" });
  }
}

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Data from "@/models/DataSchema";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const _id = searchParams.get("_id");
  const index = searchParams.get("idx");

  try {
    if (!_id || !index) {
      return NextResponse.json({ status: 400, message: "Some error occured" });
    }

    await connectDB();

    const user = await Data.find({ userId: _id });

    if (!user) {
      return NextResponse.json({ status: 400, message: "No data found" });
    }

    const extractedData = user[index];

    return NextResponse.json({ status: 200, message: extractedData });
  } catch (error) {
    console.log("Error in the schoolget ", error);
    return NextResponse.json({ status: 404, message: "Internal server error" });
  }
}

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Data from "@/models/DataSchema";

export async function GET(req: Request) {
  const schoolName = decodeURIComponent(req.url.split("/")[5]);
  const _id = req.headers.get("X-userId");

  if (!_id || !schoolName) {
    console.log("_id  or schoolName not received in the dynamic api route");
    return NextResponse.json({
      status: 404,
      message: "An error occured. Please Try again later",
    });
  }

  try {
    await connectDB();
    const school = await Data.findOne({
      userId: _id,
      schoolName,
    });

    if (!school) {
      return NextResponse.json({
        status: 404,
        message: "No Data found",
      });
    }

    return NextResponse.json({
      status: 200,
      data: school.data,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}

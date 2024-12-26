import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Data from "@/models/DataSchema";

export async function GET(req: Request) {
  const schoolIndex = parseInt(req.url.split("/")[5]);
  const _id = req.headers.get("X-userId");

  if (!_id) {
    console.log("_id not received in the dynamic api route");
    return NextResponse.json({
      status: 404,
      message: "An error occured. Please Try again later",
    });
  }

  try {
    await connectDB();
    const allSchools = await Data.find({ userId: _id });

    if (allSchools.length === 0) {
      return NextResponse.json({
        status: 404,
        message: "No Data found",
      });
    }

    const school = allSchools[schoolIndex];

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

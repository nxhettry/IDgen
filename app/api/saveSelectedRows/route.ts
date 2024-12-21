import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import Data from "@/models/DataSchema";
import { authOptions } from "@/lib/authOptions";
import mongoose from "mongoose";

export async function POST(req: Request) {
  const body = await req.json();
  const { title, selectedData } = body;

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ status: 401, message: "Unauthorized !" });
  }

  try {
    const { _id, isPremium } = session.user;

    // Only allowing premium users to save data
    if (!isPremium) {
      return NextResponse.json({
        status: 403,
        message: "You need to be a premium user to save data",
      });
    }

    // Checking if the same sheetName already exists for the user
    const existingData = await Data.findOne({ userId: _id, sheetName: title });

    console.log(
      `${existingData ? "Data already exists" : "Data does not exist"}`
    );

    if (existingData) {
      return NextResponse.json({
        status: 400,
        message:
          "Data already exists, Either update the existing data or use a different sheet name",
      });
    }

    const userId = new mongoose.Types.ObjectId(_id);

    const data = new Data({
      userId,
      data: selectedData,
      sheetName: title,
    });

    await data.save();
  } catch (error) {
    console.log("Error from /saveSelectedRows", error);
    return NextResponse.json({
      status: 500,
      message: "Something went wrong",
    });
  }

  return NextResponse.json({
    status: 200,
    message: "Data saved successfully",
  });
}

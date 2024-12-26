import Data from "@/models/DataSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req: Request) {
  const { schoolName }: { schoolName: string } = await req.json();
  const session = await getServerSession(authOptions);
  const { _id, isPremium } = session.user;

  if (!schoolName) {
    return NextResponse.json({
      status: 400,
      message: "School name is required",
    });
  }

  if (!session || !isPremium) {
    return NextResponse.json({
      status: 401,
      message: "You are not authorized to perform this action",
    });
  }

  try {
    const data = new Data({
      userId: new mongoose.Types.ObjectId(_id),
      schoolName: schoolName,
      data: [],
    });

    await data.save();

    return NextResponse.json({
      status: 200,
      message: "School added successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
    });
  }
}

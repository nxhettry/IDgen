import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/db";
// import Data from "@/models/DataSchema";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const schoolIndex = searchParams.get("schoolid");

  console.log("Received index : ", schoolIndex);

  return NextResponse.json({ message: "Hello" });
}

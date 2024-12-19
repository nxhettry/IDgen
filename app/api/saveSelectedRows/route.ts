import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("Server aayo");
  const body = await req.json();
  

  return NextResponse.json({
    status: 200,
    message: "Data saved successfully",
  });
}

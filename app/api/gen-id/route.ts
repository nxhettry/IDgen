import { NextResponse } from "next/server";

export async function GET(req: Request) {
  return NextResponse.json({ name: "this is server" });
}

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import Data from "@/models/DataSchema";
import { NextRequest, NextResponse } from "next/server";
import { SessionType } from "@/types/SessionType";

export async function POST(req: NextRequest) {
  const session: SessionType | null = await getServerSession(authOptions);
  const { schoolName, className, data } = await req.json();

  if (!session || !session.user.isPremium) {
    return NextResponse.json({ status: 401, message: "Unauthorized" });
  }

  console.log(schoolName, "\n", className, "\n", data);

  return NextResponse.json({ status: 200, message: "Success" });
}

import { NextResponse, type NextRequest } from "next/server";
import Data from "@/models/DataSchema";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

function getSchoolID(currentUrl: string) {
  const parts = currentUrl.split("/");
  const schoolId = parts[3];
  return schoolId;
}

export async function POST(req: NextRequest) {
  const className = await req.json();
  const schoolId = parseInt(getSchoolID(req.nextUrl.pathname));

  const session = await getServerSession(authOptions);

  if (!schoolId || !className || !session.user) {
    return NextResponse.json({
      status: 400,
      message: "An error occured. Please try again later.",
    });
  }

  try {
    const allSchools = await Data.find({ userId: session.user._id });

    const toUpdateSchool = allSchools[schoolId];

    return NextResponse.json({
      status: 200,
      message: toUpdateSchool.sheetName,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "Internal server error" });
  }

  return NextResponse.json({ status: 200, message: "Thank you" });
}

import { NextResponse, type NextRequest } from "next/server";
import Data from "@/models/DataSchema";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

function getschoolName(currentUrl: string) {
  const parts = currentUrl.split("/");
  return decodeURIComponent(parts[3]);
}

export async function POST(req: NextRequest) {
  const { className } = await req.json();
  const schoolName = getschoolName(req.nextUrl.pathname);

  if (!schoolName || !className) {
    return NextResponse.json({
      status: 400,
      message: "Invalid school name or class name",
    });
  }

  // Getting UId from session
  const session = (await getServerSession(authOptions)) as {
    user: { _id: string };
  };
  if (!session?.user?._id) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized access. Please log in.",
    });
  }

  try {
    const school = await Data.findOne({ userId: session.user._id, schoolName });

    if (!school) {
      return NextResponse.json({
        status: 404,
        message: "School not found",
      });
    }

    school.data.push({
      className,
      students: [],
    });

    await school.save();

    return NextResponse.json({
      status: 200,
      message: "Class Added Successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "Internal server error" });
  }

  return NextResponse.json({ status: 200, message: "Thank you" });
}

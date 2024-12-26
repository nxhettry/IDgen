import { NextResponse, type NextRequest } from "next/server";
import Data from "@/models/DataSchema";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

function getschoolIndex(currentUrl: string) {
  const parts = currentUrl.split("/");
  return parts[3];
}

export async function POST(req: NextRequest) {
  const { className } = await req.json();
  const schoolIndex = parseInt(getschoolIndex(req.nextUrl.pathname));

  if (!schoolIndex || !className) {
    return NextResponse.json({
      status: 400,
      message: "IOnvalid school index or class name",
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
    const allSchools = await Data.find({ userId: session.user._id });

    const toUpdateSchool = allSchools[schoolIndex];

    const classes = toUpdateSchool.data;

    const dataToSave = {
      className,
      students: [],
    };

    classes.push(dataToSave);
    toUpdateSchool.data = classes;

    await toUpdateSchool.save();

    return NextResponse.json({
      status: 200,
      message: toUpdateSchool.data,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "Internal server error" });
  }

  return NextResponse.json({ status: 200, message: "Thank you" });
}

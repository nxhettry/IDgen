import { type NextRequest, NextResponse } from "next/server";
import Data from "@/models/DataSchema";

function getSchoolName(pathname: string) {
  return decodeURIComponent(pathname.split("/")[3]);
}

function getClassName(pathname: string) {
  return decodeURIComponent(pathname.split("/")[4]);
}

export async function GET(req: NextRequest) {
  const _id = req.headers.get("X-userId");

  const schoolName = getSchoolName(req.nextUrl.pathname);
  const className = getClassName(req.nextUrl.pathname);

  if (!_id || !schoolName || !className) {
    return NextResponse.json({
      status: 400,
      message: "School Name, Class Name and User ID are required",
    });
  }

  try {
    const school = await Data.findOne({ userId: _id, schoolName });

    if (!school) {
      return NextResponse.json({
        status: 400,
        message: "School not found",
      });
    }

    const requiredClass = school.data.filter(
      (item) => item.className === className
    );

    if (!requiredClass) {
      return NextResponse.json({
        status: 200,
        message: "Class not found",
      });
    }

    return NextResponse.json({
      status: 200,
      data: requiredClass[0].students,
    });
    
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}

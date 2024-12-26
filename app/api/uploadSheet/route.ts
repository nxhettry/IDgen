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

  if (!schoolName || !className || !data) {
    return NextResponse.json({ status: 400, message: "Bad Request" });
  }

  try {
    await Data.findOneAndUpdate(
      {
        userId: session.user._id,
        schoolName: schoolName,
        "data.className": className,
      },
      {
        $set: {
          "data.$[item].students": data,
        },
      },
      {
        arrayFilters: [
          {
            "item.className": className,
          },
        ],
        returnDocument: "after",
      }
    );

    return NextResponse.json({
      status: 200,
      message: "Data updated succesfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }

  return NextResponse.json({ status: 200, message: "Success" });
}

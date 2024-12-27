import axios from "axios";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { SessionType } from "@/types/SessionType";
import { DataTableDemo, ExcelDataType } from "@/components/ui/table/Table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ParamsProps {
  params: { name: string; className: string };
}

export default async function DataPage({ params }: ParamsProps) {
  const { name, className } = await params;

  const session: SessionType | null = await getServerSession(authOptions);
  let students: ExcelDataType[] | [] = [];

  if (!session || !session.user.isPremium) {
    return (
      <div className="mt-24 flex flex-col justify-center items-center">
        You need to be logged in to view this page
      </div>
    );
  }

  // Fetching student data
  try {
    const res = await axios.get(
      `${process.env.NEXTAUTH_URL}/api/school/${name}/${className}`,
      {
        headers: {
          "X-userId": session.user._id,
        },
      }
    );
    students = res.data.data;

  } catch (error) {
    console.log(error);
  }

  return (
    <div className="mt-24 flex flex-col gap-6 justify-center items-center">
      <h1 className="text-white text-2xl font-bold underline">
        Students of {decodeURIComponent(className)}
      </h1>

      {students.length > 0 ? (
        <div className="3/5 bg-white rounded-lg p-3 z-30">
          <DataTableDemo data={students} title={"students"} />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-5">
          <p className="text-xl font-bold text-white">
            No data to show <br />Upload Data ?
          </p>
          <Link href="/upload" className="z-30">
            <Button className="bg-white text-black hover:scale-110 hover:bg-white transition ease-in-out duration-200">
              Add Now
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

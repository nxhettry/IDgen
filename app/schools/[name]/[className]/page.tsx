import axios from "axios";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { SessionType } from "@/types/SessionType";
import { DataTableDemo, ExcelDataType } from "@/components/ui/table/Table";

interface ParamsProps {
  params: { name: string; className: string };
}

export default async function DataPage({ params }: ParamsProps) {
  const { name, className } = await params;

  const session: SessionType | null = await getServerSession(authOptions);
  const students: ExcelDataType[] | [] = [];

  if (!session || !session.user.isPremium) {
    return;
    <div className="mt-24 flex flex-col justify-center items-center">
      You need to be logged in to view this page
    </div>;
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

    console.log(res.data);
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="mt-24 flex flex-col gap-6 justify-center items-center">
      <h1 className="text-white text-2xl font-bold underline">
        Students of {decodeURIComponent(className)}
      </h1>

      {students.length > 0 ? (
        <div className="3/5">
          <DataTableDemo data={students} title={"students"} />
        </div>
      ) : (
        <div className="text-xl font-bold text-white">No data to show</div>
      )}
    </div>
  );
}

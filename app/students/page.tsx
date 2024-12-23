import Data from "@/models/DataSchema";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { DataTableDemo } from "@/components/ui/table/Table";
import { SessionType } from "@/types/SessionType";

export default async function Students() {
  const session: SessionType | null = await getServerSession(authOptions);

  if (!session || !session.user.isPremium) {
    return <div>You need to be a Premium user to use this feature</div>;
  }

  //extracting the id from session
  const { _id } = session.user;

  //Getting the data of the user
  const data = await Data.find({ userId: _id });

  if (data.length === 0) {
    return <div>No data found</div>;
  }

  const allData = data.map((item) => item.data).flat();

  return (
    <div className="w-3/5 mx-auto bg-white mt-24 p-4 rounded-md shadow-md">
      <DataTableDemo title="All Students" data={allData} />
    </div>
  );
}

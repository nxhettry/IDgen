import axios from "axios";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { DataTableDemo } from "@/components/ui/table/Table";

export default async function Schools() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.isPremium) {
    return (
      <div className="h-full w-full flex justify-center items-center text-white text-3xl">
        You need to be a premium user to view this page
      </div>
    );
  }
  const { _id } = session.user;

  const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/school/getall`, {
    params: {
      _id,
    },
  });
  const data = await res.data;

  if (data.status !== 200) {
    return (
      <div className="h-full w-full flex justify-center items-center text-white text-3xl">
        {data.message}
      </div>
    );
  }

  return (
    <div className="h-full w-4/5 flex flex-col overflow-y-scroll justify-center items-center space-y-8 mx-auto rounded-xl p-3 text-black">
      {data.message.map((item, index) => {
        return (
          <div key={index} className="bg-gray-50 rounded-xl p-3 w-full">
            <DataTableDemo data={item.data} />
          </div>
        );
      })}
    </div>
  );
}

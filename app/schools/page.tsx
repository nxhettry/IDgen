import axios from "axios";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { DataTableDemo } from "@/components/ui/table/Table";
import SchoolCard from "@/components/ui/card/SchoolCard";

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
    <div className="h-full w-4/5 flex flex-wrap overflow-y-scroll justify-around items-center mx-auto rounded-xl p-3 text-black">
      {data.message.map((item, index) => {
        return (
          <SchoolCard
            key={index}
            date={new Date(data.message[0].createdAt).toLocaleDateString()}
            sheetName={item.sheetName}
            idx={index}
          />
        );
      })}
    </div>
  );
}

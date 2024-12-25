import axios from "axios";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import SchoolCard from "@/components/ui/card/SchoolCard";
import { SessionType } from "@/types/SessionType";
import Link from "next/link";

export default async function Schools() {
  const session: SessionType | null = await getServerSession(authOptions);
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
    <div className="flex flex-col justify-center items-center mt-24 gap-12">
      <h1 className="text-2xl font-bold underline text-white">Schools</h1>
      <div className="h-full w-4/5 flex gap-4 flex-wrap overflow-y-scroll no-scrollbar justify-center items-start mx-auto rounded-xl p-3 text-black">
        {data.message.length > 0 &&
          data.message.map(
            (item: { sheetName: string; createdAt: string }, index: number) => {
              return (
                <SchoolCard
                  key={index}
                  date={new Date(
                    data.message[0].createdAt
                  ).toLocaleDateString()}
                  sheetName={item.sheetName}
                  idx={index}
                />
              );
            }
          )}
        <Link
          href={`/schools/addnew`}
          className={`h-40 w-64 rounded-xl z-20 text-white flex flex-col gap-4 justify-center items-center`}
        >
          <div
            className={`bg-green-300 rounded-xl hover:scale-110 transition ease-in-out duration-200 text-center font-bold h-full w-full text-black flex justify-center items-center`}
          >
            <p className="text-2xl">Add New School</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

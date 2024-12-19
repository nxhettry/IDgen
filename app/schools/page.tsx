import axios from "axios";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

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
  const data = await res.message;

  return (
    <div className="h-full w-full flex justify-center items-center text-white text-3xl">
      hello
    </div>
  );
}

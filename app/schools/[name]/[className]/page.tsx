import axios from "axios";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { SessionType } from "@/types/SessionType";

interface ParamsProps {
  params: { name: string; className: string };
}

export default async function DataPage({ params }: ParamsProps) {
  const { name, className } = await params;

  const session: SessionType | null = await getServerSession(authOptions);

  if (!session || !session.user.isPremium) {
    return;
    <div className="mt-24 flex flex-col justify-center items-center">
      You need to be logged in to view this page
    </div>;
  }

  // Fetching student data
  try {
    const res = await axios.get(`/api/schools/${name}/${className}`, {
      headers: {
        "X-userId": session.user._id,
      },
    });

    console.log(res.data);
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      <h1 className="text-white text-2xl">
        {decodeURIComponent(name)} {decodeURIComponent(className)}
      </h1>
    </div>
  );
}

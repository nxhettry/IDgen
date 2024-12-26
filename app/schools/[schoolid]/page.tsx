import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import axios from "axios";

const Class = async ({ params }: { params: { schoolid: number } }) => {
  const { schoolid } = await params;

  // Getting the session details
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="mt-24 flex justify-center items-center">
        Please Login to continue
      </div>
    );
  }

  try {
    const res = await axios.get(
      `${process.env.NEXTAUTH_URL}/api/school/${schoolid}`,
      {
        headers: {
          "X-userId": session.user._id,
        },
      }
    );

    console.log(res.data);
  } catch (error) {
    console.log(error.message);
  }

  return (
    <div className="text-white flex justify-center items-center mt-24">
      school with id: {schoolid}
    </div>
  );
};

export default Class;

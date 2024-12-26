import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import axios from "axios";
import ClassCard from "@/components/ui/card/ClassCard";
import Popup from "@/components/pages/class/Popup";

const Class = async ({ params }: { params: { schoolid: number } }) => {
  const { schoolid } = await params;

  // Getting the session details
  const session = await getServerSession(authOptions);
  let classes = [];

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
    classes = res.data;
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="flex flex-col justify-center items-center mt-24 gap-12">
      <h1 className="text-2xl font-bold underline text-white">Classes</h1>
      {classes.length > 0 &&
        classes.map((item: any, index: number) => {
          return (
            <ClassCard
              key={index}
              index={index}
              className={item.className}
              schoolid={schoolid}
              date={new Date(item.message[0].createdAt).toLocaleDateString()}
            />
          );
        })}
      <div className="z-30">
        <Popup uid={session.user._id} schoolId={schoolid} />
      </div>
    </div>
  );
};

export default Class;

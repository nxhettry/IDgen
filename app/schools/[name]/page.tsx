import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import axios from "axios";
import ClassCard from "@/components/ui/card/ClassCard";
import Popup from "@/components/pages/class/Popup";
import { SessionType } from "@/types/SessionType";

const Class = async ({ params }: { params: { name: string } }) => {
  const { name } = await params;

  // Getting the session details
  const session: SessionType | null = await getServerSession(authOptions);
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
      `${process.env.NEXTAUTH_URL}/api/school/${name}`,
      {
        headers: {
          "X-userId": session?.user._id,
        },
      }
    );
    classes = res.data.data;
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="flex flex-col mt-24 gap-8">
      <h1 className="text-2xl w-full text-center font-bold underline text-white">Classes</h1>
      <div className="flex flex-wrap justify-center items-center  gap-12">
        {classes.length > 0 &&
          classes.map((item: any, index: number) => {
            return (
              <ClassCard
                key={index}
                schoolName={name}
                className={item.className}
              />
            );
          })}
        <div className="z-30">
          <Popup schoolName={name} />
        </div>
      </div>
    </div>
  );
};

export default Class;

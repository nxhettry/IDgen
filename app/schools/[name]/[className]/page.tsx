import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { DataTableDemo } from "@/components/ui/table/Table";

const page = async ({ params }: { params: { className: string, name: string } }) => {
  const { className, name } = await params;

  return <div className="flex text-white font-bold text-3xl">
    hello {decodeURIComponent(name)} {decodeURIComponent(className)}
  </div>


  const session = await getServerSession(authOptions);
  let data;
  if (!session || !session.user.isPremium) {
    return (
      <div className="h-full w-full flex justify-center items-center text-white text-3xl">
        You need to be a premium user to view this page
      </div>
    );
  }

  try {
    const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/school`, {
      params: {
        classNamex: className,
        _className: session.user._className,
      },
    });

    data = res.data.message.data;
  } catch (error) {
    console.log(error);
  }
  return (
    <div className="text-3xl font-bold text-white flex justify-center items-center h-full">
      {!data ? "No data found" : 
      <div className="w-4/5 mx-auto rounded-xl p-3 text-black bg-gray-50">

      <DataTableDemo data={data} />
      </div>
      }
    </div>
  );
};

export default page;

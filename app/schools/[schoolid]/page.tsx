import axios from "axios";

const Class = async ({ params }: { params: { schoolid: number } }) => {
  const { schoolid } = await params;

  try {
    const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/school/${schoolid}`);

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

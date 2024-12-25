const Classes = async ({ params }: { params: { id: number } }) => {
  const { id } = await params;

  return (
    <div className="text-white flex justify-center items-center mt-24">
      school with id: {id}
    </div>
  );
};

export default Classes;

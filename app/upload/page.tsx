import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { SessionType } from "@/types/SessionType";
import Data from "@/models/DataSchema";
import UploadForm from "@/components/pages/upload/UploadForm";

interface ClassNameType {
  schoolName: string;
  classes: string[];
}

const Upload = async () => {
  const session: SessionType | null = await getServerSession(authOptions);

  if (!session || !session.user.isPremium) {
    return (
      <div className="mt-24 w-full text-center">Please login to continue</div>
    );
  }
  const schoolNames: string[] = [];
  const classNames: ClassNameType[] = [];

  try {
    const allData = await Data.find({ userId: session.user._id });

    allData.forEach((school) => {
      if (!schoolNames.includes(school.schoolName)) {
        schoolNames.push(school.schoolName);
      }

      const classes = school.data.map((item) => item.className);

      classNames.push({
        schoolName: school.schoolName,
        classes: classes,
      });
    });
  } catch (error) {
    console.log(error);
  }

  return (
    <UploadForm
      schoolNames={schoolNames}
      classNames={classNames}
    />
  );
};

export default Upload;

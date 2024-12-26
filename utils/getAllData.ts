import axios from "axios";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { SessionType } from "@/types/SessionType";

const getSession = async () => {
  const session: SessionType | null = await getServerSession(authOptions);
  let _id = "";
  if (session) _id = session.user._id;

  return _id;
};

export const getAllSchool = async () => {
  const _id = await getSession();
  if (_id === "") {
    return;
  }

  try {
    const res = await axios.get(
      `${process.env.NEXTAUTH_URL}/api/school/getall`,
      {
        params: {
          _id,
        },
      }
    );

    const data = await res.data;
    console.log(data.message);
  } catch (error) {
    console.log(error);
  }
};

export const getAllClass = async () => {
  const _id = await getSession();

  if (_id === "") {
    return;
  }

  try {
    const res = await axios.get(
      `${process.env.NEXTAUTH_URL}/api/school/${name}`,
      {
        headers: {
          "X-userId": _id,
        },
      }
    );
    const classes = res.data.data;

    console.log(classes);
  } catch (error) {
    console.log(error);
  }
};

import axios from "axios";

export const getAllSchool = async (_id: string) => {
  if (!_id) {
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

export const getAllClass = async (_id: string) => {
  if (!_id) {
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

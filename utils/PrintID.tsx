"use client";
import axios from "axios";

interface RowType {
  fullname: string;
  contact: string;
  email: string;
  address: string;
  dob: string;
  grade: string;
  bloodGroup: string;
}

interface SelectedRowType {
  original: RowType;
}

export const PrintID = (
  title: string,
  selectedRows: SelectedRowType[],
  isPremium: boolean,
  router: any
) => {

  if (selectedRows.length === 0) return;

  const selectedData = selectedRows.map((row: SelectedRowType) => row.original);

  const dataToPost = {
    title, //For school name
    selectedData, //For the actual data
  };

  // Save selected data
  if (isPremium) {
    const saveData = async () => {
      await axios.post("/api/saveSelectedRows", dataToPost, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    };

    saveData();
  }

  const url = new URL("/id-preview", window.location.origin);
  url.searchParams.append("title", title);
  url.searchParams.append("data", JSON.stringify(selectedData));

  router.push(url.toString());
};

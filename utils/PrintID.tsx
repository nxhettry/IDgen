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

export const PrintID = async (title, selectedRows, isPremium) => {
  if (selectedRows.length === 0) return;

  const selectedData = selectedRows.map((row: SelectedRowType) => row.original);

  const dataToPost = {
    title, //For school name
    selectedData, //For the actual data
  };

  // Save selected data
  if (isPremium) {
    const bhado = await axios.post("/api/saveSelectedRows", dataToPost, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(bhado.data.message);
  }

  const newTab = window.open("", "_blank");

  if (newTab) {
    const idCardsHtml = selectedData
      .map(
        (row: RowType) => `
        <div style="border: 1px solid black; padding: 16px; margin: 8px; width: 200px;">
          <h3>${row.fullname}</h3>
          <p><strong>Contact:</strong> ${row.contact}</p>
          <p><strong>Email:</strong> ${row.email}</p>
          <p><strong>Address:</strong> ${row.address}</p>
          <p><strong>DOB:</strong> ${row.dob}</p>
          <p><strong>Grade:</strong> ${row.grade}</p>
          <p><strong>Blood Group:</strong> ${row.bloodGroup}</p>
        </div>`
      )
      .join("");

    newTab.document.body.innerHTML = `
        <div style="display: flex; flex-wrap: wrap; justify-content: center;">
          ${idCardsHtml}
        </div>`;
  }
};

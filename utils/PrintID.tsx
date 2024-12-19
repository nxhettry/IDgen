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

export const PrintID = (selectedRows) => {
  if (selectedRows.length === 0) return;

  // Extract selected data
  const selectedData = selectedRows.map((row: SelectedRowType) => row.original);

  // Open new tab
  const newTab = window.open("", "_blank");

  if (newTab) {
    // Generate ID Card HTML
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

    // Render content in new tab
    newTab.document.body.innerHTML = `
        <div style="display: flex; flex-wrap: wrap; justify-content: center;">
          ${idCardsHtml}
        </div>`;
  }
};

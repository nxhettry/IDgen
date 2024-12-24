"use client";
import { useState, useEffect } from "react";
import { ExcelDataType } from "@/components/ui/table/Table";
import Image from "next/image";

interface RowType extends ExcelDataType {
  photo?: string;
}

interface IDPreviewProps {
  searchParams: {
    title: string;
    data: string;
  };
}

export default function IDPreview({ searchParams }: IDPreviewProps) {
  const [title, setTitle] = useState<string>("");
  const [students, setStudents] = useState<RowType[]>([]);

  useEffect(() => {
    if (searchParams) {
      setTitle(searchParams.title);
      const parsedData: ExcelDataType[] = JSON.parse(searchParams.data);
      setStudents(parsedData);
    }
  }, [searchParams]);

  const handlePhotoUpload = (index, file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const updatedStudents = [...students];
      const result = reader.result as string;
      updatedStudents[index].photo = result;
      setStudents(updatedStudents);
    };
    reader.readAsDataURL(file);
  };

  const handlePrint = () => {
    const idCardsHtml = students
      .map(
        (student) => `
        <div style="border: 1px solid black; padding: 16px; margin: 8px; width: 200px;">
          <img src="${student.photo}" alt="Photo" style="width: 100%; height: 100px; object-fit: cover;" />
          <h3>${student.fullname}</h3>
          <p><strong>Contact:</strong> ${student.contact}</p>
          <p><strong>Email:</strong> ${student.email}</p>
          <p><strong>Address:</strong> ${student.address}</p>
          <p><strong>DOB:</strong> ${student.dob}</p>
          <p><strong>Grade:</strong> ${student.grade}</p>
          <p><strong>Blood Group:</strong> ${student.bloodGroup}</p>
        </div>`
      )
      .join("");

    const newTab = window.open("", "_blank");
    if (newTab)
      newTab.document.body.innerHTML = `
        <div style="display: flex; flex-wrap: wrap; justify-content: center;">
            ${idCardsHtml}
        </div>`;
    newTab.print();
  };

  return (
    <div>
      <h1>{title}</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {students.map((student, index) => (
          <div
            key={index}
            style={{
              border: "1px solid black",
              padding: "16px",
              margin: "8px",
              width: "200px",
            }}
          >
            <h3>{student.fullname}</h3>
            <p>
              <strong>Contact:</strong> {student.contact}
            </p>
            <p>
              <strong>Email:</strong> {student.email}
            </p>
            <p>
              <strong>Address:</strong> {student.address}
            </p>
            <p>
              <strong>DOB:</strong> {student.dob}
            </p>
            <p>
              <strong>Grade:</strong> {student.grade}
            </p>
            <p>
              <strong>Blood Group:</strong> {student.bloodGroup}
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handlePhotoUpload(index, e.target.files[0])}
            />
            {student.photo && (
              <Image
                src={student.photo}
                alt="Uploaded Photo"
                height={500}
                width={500}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        ))}
      </div>
      <button onClick={handlePrint} style={{ marginTop: "20px" }}>
        Print Final ID Cards
      </button>
    </div>
  );
}

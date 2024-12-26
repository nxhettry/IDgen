"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useSession } from "next-auth/react";
import axios from "axios";
import { ExcelDataType } from "@/components/ui/table/Table";

export default function UploadForm({
  schoolNames,
  classNames,
}: {
  schoolNames: string[];
  classNames: {
    schoolName: string;
    classes: string[];
  }[];
}) {
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [fileData, setFileData] = useState<ExcelDataType[] | []>([]);
  const [showError, setShowError] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  // These are the choices of the user
  const [schoolName, setSchoolName] = useState<string>("");
  const [className, setClassName] = useState<string>("");

  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileData || schoolName === "" || className === "") {
      setShowError(true);
      clearForm();
      return;
    }

    const dataToPost: {
      schoolName: string;
      className: string;
      data: ExcelDataType[];
    } = {
      schoolName,
      className,
      data: fileData,
    };

    // Send data to server
    try {
      await axios.post("/api/uploadSheet", dataToPost, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setShowSuccess(true);
    } catch (error) {
      console.log(error);
    }

    clearForm();
  };

  const clearForm = () => {
    setSchoolName("");
    setFileData([]);
    
    setTimeout(() => {
      setShowError(false);
    }, 3000);

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleButtonClick = () => {
    // Check if user is logged in
    if (!session) {
      return;
    }

    // Simulate a Click on the button to trigger file upload
    const fileInput = document.querySelector(".fileInput") as HTMLInputElement;
    fileInput?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      alert("Please select a file.");
      return;
    }

    setLoading(true);
    setShowSuccess(false);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const binaryStr = event.target?.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setFileData(jsonData as ExcelDataType[]);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } catch (error) {
        alert("Error reading file. Please try again.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsBinaryString(file);
  };

  if (!session) {
    return (
      <div className="text-lg text-white flex justify-center items-center mt-64 font-bold">
        You need to be logged in to access this page
      </div>
    );
  }

  return (
    <div className="border border-white bg-white p-6 z-30 rounded-lg mt-32 w-2/5 mx-auto flex flex-col gap-6 justify-center items-center">
      {showSuccess && (
        <div className="fixed top-4 right-4 text-green-800 font-regular bg-white rounded-xl flex justify-center items-center h-12 w-[20rem]">
          Data Saved Successfully
        </div>
      )}

      <div className="w-4/5 mx-auto flex flex-col justify-center items-start gap-3">
        {/* School Dropdown */}
        <label
          htmlFor="SchoolSelect"
          className="relative w-full block p-2 rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <select
            id="SchoolSelect"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
            required
          >
            <option value="" disabled>
              Select School
            </option>
            {schoolNames.map((school, index) => (
              <option key={index} value={school}>
                {school}
              </option>
            ))}
          </select>

          <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
            Schoolname
          </span>
        </label>
        {showError && (
          <p className="text-red-500 text-sm">This field is required</p>
        )}

        {/* Class Dropdown */}
        <label
          htmlFor="ClassSelect"
          className="relative w-full block p-2 rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <select
            id="ClassSelect"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
            required
          >
            <option value="" disabled>
              Select Class
            </option>
            {classNames
              .find((school) => school.schoolName === schoolName)
              ?.classes.map((classItem, index) => (
                <option key={index} value={classItem}>
                  {classItem}
                </option>
              )) || (
              <option value="" disabled>
                No classes available
              </option>
            )}
          </select>

          <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
            Classname
          </span>
        </label>
        {showError && (
          <p className="text-red-500 text-sm">This field is required</p>
        )}
      </div>

      <div className="flex items-center justify-center w-full">
        <label className="block w-4/5">
          <span className="sr-only text-white">Choose Excel file</span>
          <input
            type="file"
            className="hidden fileInput"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            required
          />
          <div
            className="mt-1 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-gray-500 transition-colors"
            onClick={handleButtonClick}
          >
            <div className="space-y-1 text-center">
              <div className="flex justify-center items-center text-sm text-gray-600">
                <button
                  type="button"
                  className="relative bg-black font-medium text-white rounded-md px-8 py-2 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  {loading ? "Uploading..." : "Upload Excel file"}
                </button>
              </div>
              <p className="text-xs text-black">Supported formats: XLSX, XLS</p>
            </div>
          </div>
          {showError && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </label>
      </div>

      <Button
        variant="default"
        className="z-30 font-ubuntu-mono w-full"
        onClick={handleSubmit}
      >
        Save Data
      </Button>

      {showSuccess && (
        <div className="fixed top-0 right-12 mt-4 p-4 bg-green-100 rounded-md">
          <p className="text-green-700 text-center">
            File uploaded successfully: uploaded.xlsx
          </p>
        </div>
      )}
    </div>
  );
}

"use client";
import React, { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { IoMdClose } from "react-icons/io";
import * as XLSX from "xlsx";
import { DataTableDemo, ExcelDataType } from "@/components/ui/table/Table";
import { set } from "mongoose";

export default function Home() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [title, setTitle] = useState<string>("Schoolname");
  const [excelData, setExcelData] = useState<ExcelDataType[]>();
  const { data: session } = useSession();

  const handleButtonClick = () => {
    // Check if user is logged in
    if (!session) {
      setShowLoginPopup(true);
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

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryStr = event.target?.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      setTitle(sheetName);
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(jsonData);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="h-full w-full flex justify-start pt-48 items-center gap-7 text-white flex-col">
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="text-4xl font-ubuntu-mono font-bold">ID{"-"}GEN</p>
        <p className="text-md font-ubuntu font-semibold text-gray-50">
          Generate professional looking IDs at a click
        </p>
      </div>

      <div className="mt-8 w-4/5 md:3/5 lg:w-2/5 h-1/3">
        <label className="block">
          <span className="sr-only text-white">Choose Excel file</span>
          <input
            type="file"
            className="hidden fileInput"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
          />
          <div
            className="mt-1 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-indigo-500 transition-colors"
            onClick={handleButtonClick}
          >
            <div className="space-y-1 text-center">
              <div className="flex justify-center items-center text-sm text-gray-600">
                <button
                  type="button"
                  className="relative bg-indigo-600 font-medium text-white rounded-md px-8 py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Select File
                </button>
              </div>
              <p className="text-xs text-gray-300">
                Supported formats: XLSX, XLS
              </p>
            </div>
          </div>
        </label>
      </div>

      {showSuccess && (
        <div className="fixed top-0 right-12 mt-4 p-4 bg-green-100 rounded-md">
          <p className="text-green-700 text-center">
            File uploaded successfully: uploaded.xlsx
          </p>
        </div>
      )}

      {/* Login Modal */}
      {showLoginPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowLoginPopup(false)}
            aria-hidden="true"
          />

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-8 transform transition-all">
            <button
              onClick={() => setShowLoginPopup(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              aria-label="Close login popup"
            >
              <IoMdClose className="w-6 h-6" />
            </button>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Login to Continue
              </h2>
              <p className="text-gray-600">
                Please sign in to access your account
              </p>
            </div>

            <div className="space-y-6">
              <button
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => signIn("google")}
              >
                <FcGoogle className="w-6 h-6" />
                <span className="text-gray-700 font-medium">
                  Login with Google
                </span>
              </button>

              <p className="text-center text-sm text-gray-500">
                Continue with your Google account
              </p>
            </div>
          </div>
        </div>
      )}

      {excelData && (
        <div className="h-full w-4/5 mx-auto mt-8 bg-gray-50 rounded-xl p-3 text-black">
          <DataTableDemo title={title} data={excelData} />
        </div>
      )}
    </div>
  );
}

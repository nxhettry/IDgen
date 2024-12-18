"use client";
import React, { useState } from "react";

export default function Home() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    size: number;
  } | null>(null);

  const handleFileChange = () => {
    alert("File uploaded successfully");
    setShowSuccess(true);
    setSelectedFile({
      name: "sample.xlsx",
      size: 1000,
    });
  };

  return (
    <div className="h-full w-full flex justify-start pt-48 items-center gap-7 text-white flex-col">
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="text-4xl font-ubuntu-mono font-bold">ID{"-"}GEN</p>
        <p className="text-md font-ubuntu font-semibold text-gray-50">
          Generate professional looking IDs at a click
        </p>
      </div>

      <div className="mt-8">
        <label className="block">
          <span className="sr-only">Choose Excel file</span>
          <input
            type="file"
            className="hidden"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
          />
          <div className="mt-1 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-indigo-500 transition-colors">
            <div className="space-y-1 text-center">
              <div className="flex justify-center items-center text-sm text-gray-600">
                <button className="relative bg-indigo-600 font-medium text-white rounded-md px-8 py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
        <div className="mt-4 p-4 bg-green-100 rounded-md">
          <p className="text-green-700 text-center">
            File uploaded successfully:{" "}
            {selectedFile?.name ? selectedFile.name : "sample.xlsx"}
          </p>
        </div>
      )}
    </div>
  );
}

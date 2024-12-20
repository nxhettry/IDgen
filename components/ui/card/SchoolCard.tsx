"use client";
import React, { useState } from "react";
import { ExcelDataType } from "../table/Table";

const SchoolCard = ({ text, data }: { text: string; data: ExcelDataType[] }) => {
  const [isCardHovered, setIsCardHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      className={`h-28 w-64 rounded-xl z-20 ${
        isCardHovered && "border-dotted border-white border-2"
      } text-black flex justify-center items-center`}
    >
      <div
        className={`${
          isCardHovered && "hover:-translate-x-2 hover:-translate-y-2"
        } bg-white rounded-xl  h-full w-full text-black flex justify-center items-center`}
      >
        {text}
      </div>
    </div>
  );
};

export default SchoolCard;

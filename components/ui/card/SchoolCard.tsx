"use client";
import Link from "next/link";
import React, { useState } from "react";

const SchoolCard = ({ idx }: { idx: number }) => {
  const [isCardHovered, setIsCardHovered] = useState(false);
  return (
    <Link
      href={`/schools/${idx}`}
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
        School {idx + 1}
      </div>
    </Link>
  );
};

export default SchoolCard;

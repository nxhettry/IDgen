"use client";
import Link from "next/link";
import React, { useState } from "react";

const SchoolCard = ({ idx, date }: { idx: number; date: string }) => {
  const [isCardHovered, setIsCardHovered] = useState(false);
  return (
    <Link
      href={`/schools/${idx}`}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      className={`h-40 w-64 rounded-xl z-20 ${
        isCardHovered && "border-dashed border-white border-spacing-40 border-2"
      } text-black flex justify-center items-center`}
    >
      <div
        className={`${
          isCardHovered && "transition-all ease-in-out duration-200 hover:-translate-x-2 hover:-translate-y-2"
        } bg-white rounded-xl text-center font-bold h-full w-full text-black flex justify-center items-center`}
      >
        School {idx + 1}
        <br />
        {date}
      </div>
    </Link>
  );
};

export default SchoolCard;

"use client";
import Link from "next/link";
import React, { useState } from "react";

interface ClassCardProps {
  schoolName: string;
  className: string;
}

const ClassCard = ({ schoolName, className }: ClassCardProps) => {
  const [isCardHovered, setIsCardHovered] = useState<boolean>(false);

  return (
    <Link
      href={`/schools/${schoolName}/${className}`}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      className={`h-40 w-64 rounded-xl z-20 ${
        isCardHovered && "border-dashed border-white border-spacing-40 border-2"
      } text-black flex justify-center items-center`}
    >
      <div
        className={`${
          isCardHovered &&
          "transition-all ease-in-out duration-200 hover:-translate-x-2 hover:-translate-y-2"
        } bg-white rounded-xl text-center font-bold h-full w-full text-black flex justify-center items-center`}
      >
        {className}
      </div>
    </Link>
  );
};

export default ClassCard;

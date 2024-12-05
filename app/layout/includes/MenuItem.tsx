"use client";
import { MenuItemTypes } from "@/app/types";
import { AiOutlineHome } from "react-icons/ai";
import { BsCameraVideo } from "react-icons/bs";
import { RiGroupLine } from "react-icons/ri";
import React from "react";

export default function MenuItem({
  iconString,
  colorString,
  sizeString,
}: MenuItemTypes) {
  const icons = () => {
    if (iconString == "בשבילך")
      return <AiOutlineHome size={sizeString} color={colorString} />;
    if (iconString == "עוקבים")
      return <RiGroupLine size={sizeString} color={colorString} />;
    if (iconString == "בשידור")
      return <BsCameraVideo size={sizeString} color={colorString} />;
  };

  return (
    <div className="w-full flex items-center hover:bg-gray-100 p-2.5 rounded-md">
      <div className="flex it lg:mx-0 mx-auto">
        {icons()}
        <p
          className={`lg:block hidden pl-[9px] font-semibold text-[17px] text-[${colorString}]`}
        >
          {iconString}
        </p>
      </div>
    </div>
  );
}

import React from "react";
import { Badge } from "./ui/badge";

export default function LatestJobCards() {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
      <div>
        <h1 className="font-medium text-lg">Company Name</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">Job Title</h1>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Lorem ipsum
          dolor sit amet.
        </p>
      </div>

      <div className="flex items-center mt-4 gap-2">
        <Badge variant="ghost" className={"text-blue-700 font-bold"}>
          12 Position
        </Badge>
        <Badge variant="ghost" className={"text-[#F83002] font-bold"}>
          Part Time
        </Badge>
        <Badge variant="ghost" className={"text-[#7209B7] font-bold"}>
          24 LPA
        </Badge>
      </div>
    </div>
  );
}
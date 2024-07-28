import React from "react";
import { Badge } from "./ui/badge";

export default function LatestJobCards({job}) {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
      <div>
        <h1 className="font-medium text-lg">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">{job?.company?.location}</p>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">
         {job?.description}
        </p>
      </div>

      <div className="flex items-center mt-4 gap-2">
        <Badge variant="ghost" className={"text-blue-700 font-bold"}>
          {job?.positions} Positions
        </Badge>
        <Badge variant="ghost" className={"text-[#F83002] font-bold"}>
          {job?.jobType}
        </Badge>
        <Badge variant="ghost" className={"text-[#7209B7] font-bold"}>
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
}

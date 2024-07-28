import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

export default function Job() {
  const navigate = useNavigate();
  const jobId = 12365556;
  return (
    <>
      <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">2 Days Ago</p>
          <Button variant="outline" className="rounded-full" size="icon">
            <Bookmark />
          </Button>
        </div>

        <div className="flex items-center gap-2 my-2">
          <Button className="p-6" variant="outline" size="icon">
            <Avatar>
              <AvatarImage src="" />
            </Avatar>
          </Button>

          <div className="">
            <h1 className="font-medium text-lg">Company Name</h1>
            <p className="text-sm text-gray-500">India</p>
          </div>
        </div>

        <div>
          <h1 className="font-bold text-lg my-2">Title</h1>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
            dolorum alias repellat corporis ullam iste, odit error atque quaerat
            reprehenderit!
          </p>
        </div>

        <div className="flex items-center mt-4 gap-2 overflow-x-auto">
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

        <div className="flex items-center gap-4 mt-4">
          <Button
            onClick={() => navigate(`description/${jobId}`)}
            variant="outline"
          >
            Details
          </Button>
          <Button className="bg-[#6A38C2] hover:bg-[#4508ae]">
            Save for Later
          </Button>
        </div>
      </div>
    </>
  );
}

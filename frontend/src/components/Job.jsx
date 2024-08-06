import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Job({ job }) {
  const navigate = useNavigate();

  const daysAgo = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiff = currentTime - createdAt;
    return Math.floor(timeDiff / (1000 * 24 * 60 * 60));
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}
        className="p-5 rounded-md shadow-xl bg-white border border-gray-100"
      >
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {daysAgo(job?.createdAt) === 0
              ? "Today"
              : `${daysAgo(job?.createdAt)} days ago`}
          </p>
          <Button variant="outline" className="rounded-full" size="icon">
            <Bookmark />
          </Button>
        </div>

        <div className="flex items-center gap-2 my-2">
          <Button className="p-6" variant="outline" size="icon">
            <Avatar>
              <AvatarImage src={job?.company?.logo ? job?.company?.logo : ""} />
            </Avatar>
          </Button>

          <div className="">
            <h1 className="font-medium text-lg">{job?.company?.name}</h1>
            <p className="text-sm text-gray-500">{job?.location}</p>
          </div>
        </div>

        <div>
          <h1 className="font-bold text-lg my-2">{job?.title}</h1>
          <p className="text-sm text-gray-600">{job?.description}</p>
        </div>

        <div className="flex items-center mt-4 gap-2 overflow-x-auto">
          <Badge variant="ghost" className={"text-blue-700 font-bold"}>
            {job?.positions} Position
          </Badge>
          <Badge variant="ghost" className={"text-[#F83002] font-bold"}>
            {job?.jobType}
          </Badge>
          <Badge variant="ghost" className={"text-[#7209B7] font-bold"}>
            {job?.salary} LPA
          </Badge>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <Button
            onClick={() => navigate(`description/${job?._id}`)}
            variant="outline"
          >
            Details
          </Button>
          <Button className="bg-[#6A38C2] hover:bg-[#4508ae]">
            Save for Later
          </Button>
        </div>
      </motion.div>
    </>
  );
}

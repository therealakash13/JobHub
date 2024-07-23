import React from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

export default function HeroSection() {
  return (
    <>
      <div className="text-center">
        <div className="flex flex-col  space-y-8 ">
          <span className=" mx-auto px-4 rounded-full font-medium bg-gray-100 text-[#F83002]">
            No. 1 Job Hunt Website
          </span>
          <h1 className="text-4xl font-bold">
            Find Your <span className="text-[#6A38C2]">Dream Job</span> Today
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequatur, sed quis illo praesentium cupiditate delectus.
          </p>

          <div className=" flex w-[40%] shadow-lg border border-r-gray-200 pl-5  rounded-full items-center gap-4 mx-auto ">
            <input
              type="text"
              placeholder="Search Jobs Here..."
              className="border-none outline-none w-full"
            />
            <Button className="rounded-r-full bg-[#6A38C2] hover:bg-[#4508ae]">
              <Search className="h-5 w-5 " />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

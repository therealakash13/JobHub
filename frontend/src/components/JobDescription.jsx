import React, { Fragment } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default function JobDescription() {
  const isApplied = true;
  return (
    <Fragment>
      <div className="max-w-4xl mx-auto my-10 ">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-xl">Title</h1>
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
          </div>
          <Button
            disabled={isApplied}
            className={`rounded-lg ${
              isApplied
                ? `bg-gray-600 cursor-not-allowed`
                : `bg-[#6A38C2] hover:bg-[#4508ae]`
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>

        <div className="m-4  overflow-auto">
          <h1 className="font-medium text-lg py-3">Job Description</h1>
          <hr className="bg-gray-800  border-2 rounded-xl" />

          <div className="my-4 space-y-4">
            <h1 className="font-bold my-1">
              Role :{" "}
              <span className=" pl-4 font-normal text-gray-800 ">
                Front End Developer
              </span>
            </h1>

            <h1 className="font-bold my-1">
              Location :{" "}
              <span className=" pl-4 font-normal text-gray-800 ">
                Delhi NCR
              </span>
            </h1>

            <h1 className="font-bold my-1">
              Description :{" "}
              <span className=" pl-4 font-normal text-gray-800 ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Inventore, sit.
              </span>
            </h1>

            <h1 className="font-bold my-1">
              Experience :{" "}
              <span className=" pl-4 font-normal text-gray-800 ">3 Years</span>
            </h1>

            <h1 className="font-bold my-1">
              Salary :{" "}
              <span className=" pl-4 font-normal text-gray-800 ">12 LPA</span>
            </h1>

            <h1 className="font-bold my-1">
              Total Applicants :{" "}
              <span className=" pl-4 font-normal text-gray-800 ">4</span>
            </h1>

            <h1 className="font-bold my-1">
              Posted Date :{" "}
              <span className=" pl-4 font-normal text-gray-800 ">
                13-6-2024
              </span>
            </h1>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

import React from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";

export default function Jobs() {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-[20%]">
            <FilterCard />
          </div>
          {allJobs.length <= 0 ? (
            <span>Jobs Not Found</span>
          ) : (
            <div className="flex-1 h-[80vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {allJobs.map((job) => (
                  <Job key={job?._id} job={job} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

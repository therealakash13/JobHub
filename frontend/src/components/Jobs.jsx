import React from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";

const randomJob = [1, 2, 3, 4, 5, 6, 7, 8];
export default function Jobs() {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-[20%]">
            <FilterCard />
          </div>
          {randomJob.length <= 0 ? (
            <span>Jobs Not Found</span>
          ) : (
            <div className="flex-1 h-[80vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {randomJob.map((item, index) => (
                  <Job />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

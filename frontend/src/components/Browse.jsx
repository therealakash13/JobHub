import React, { Fragment } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";

const randomJobs = [1, 2, 3, 4, 5, 6];
export default function Browse() {
  return (
    <Fragment>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="text-2xl font-bold my-10">
          Search Jobs(
          {randomJobs.length})
        </h1>

        {randomJobs.length <= 0 ? (
          <span>No jobs found.</span>
        ) : (
          <div className="grid grid-cols-3 gap-4 my-5">
            {randomJobs.map((items, index) => (
              <Job />
            ))}
          </div>
        )}
      </div>
    </Fragment>
  );
}

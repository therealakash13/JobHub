import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function Jobs() {
  const { allJobs, searchTerm } = useSelector((store) => store.job);
  const [filteredJobs, setFilteredJobs] = useState(allJobs);

  useEffect(() => {
    if (searchTerm) {
      const filter = allJobs.filter((job) => {
        return (
          job?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job?.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job?.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setFilteredJobs(filter);
    } else {
      setFilteredJobs(allJobs);
    }
  }, [allJobs, searchTerm]);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-[20%]">
            <FilterCard />
          </div>
          {filteredJobs.length <= 0 ? (
            <span>Jobs Not Found</span>
          ) : (
            <div className="flex-1 h-[80vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filteredJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job key={job?._id} job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

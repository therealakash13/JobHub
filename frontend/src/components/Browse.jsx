import React, { Fragment, useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setSearchTerm } from "@/redux/jobslice";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

export default function Browse() {
  useGetAllJobs();
  const dispatch = useDispatch();
  const { allJobs } = useSelector((store) => store.job);
  const { searchTerm } = useSelector((store) => store.job);
  const [filteredJobs, setFilteredJobs] = useState(allJobs);
  useEffect(() => {
    const filteredJobs =
      allJobs.length >= 0 &&
      allJobs.filter((allJobs) => {
        if (!searchTerm) {
          return true;
        }
        return allJobs?.title?.toLowerCase().includes(searchTerm.toLowerCase());
      });
    setFilteredJobs(filteredJobs);
  }, [allJobs, searchTerm]);

  return (
    <Fragment>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3 }}
        className="max-w-7xl mx-auto my-10"
      >
        <div className="flex items-center justify-between mx-4">
          <h1 className="text-2xl font-bold my-10">
            Search Jobs(
            {allJobs.length})
          </h1>
          <Button onClick={() => dispatch(setSearchTerm(""))} variant="ghost">
            Clear Search
          </Button>
        </div>

        {filteredJobs.length <= 0 ? (
          <span>No jobs found.</span>
        ) : (
          <div className="grid grid-cols-3 gap-4 my-5">
            {filteredJobs.map((items, index) => (
              <Job job={items} key={index} />
            ))}
          </div>
        )}
      </motion.div>
    </Fragment>
  );
}

import React, { Fragment, useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";

import axios from "axios";
import { setSingleJob } from "@/redux/jobslice";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { APPLICATION_ENDPOINT, JOB_API_ENDPOINT } from "./utils/constant";
import Navbar from "./shared/Navbar";
import { toast } from "sonner";

export default function JobDescription() {
  const dispatch = useDispatch();
  const param = useParams();
  const jobId = param.id;
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const handleApply = async () => {
    try {
      const response = await axios.get(
        `${APPLICATION_ENDPOINT}/apply/${jobId}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const response = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (response.data.success) {
          dispatch(setSingleJob(response.data.job));
          setIsApplied(
            response.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <Fragment>
      <Navbar />
      <div className="max-w-4xl mx-auto my-10 ">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-xl">{singleJob?.title}</h1>
            <div className="flex items-center mt-4 gap-2 overflow-x-auto">
              <Badge variant="ghost" className={"text-blue-700 font-bold"}>
                {singleJob?.positions} Position
              </Badge>
              <Badge variant="ghost" className={"text-[#F83002] font-bold"}>
                {singleJob?.jobType}
              </Badge>
              <Badge variant="ghost" className={"text-[#7209B7] font-bold"}>
                {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>
          {/* Make Applied Button Dynamic */}
          <Button
            onClick={isApplied ? null : handleApply}
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
                {singleJob?.title}
              </span>
            </h1>

            <h1 className="font-bold my-1">
              Location :{" "}
              <span className=" pl-4 font-normal text-gray-800 ">
                {singleJob?.location}
              </span>
            </h1>

            <h1 className="font-bold my-1">
              Requirements :{" "}
              <span className=" pl-4 font-normal text-gray-800 ">
                {singleJob?.requirements?.map(
                  (requirement) => `${requirement}, `
                )}
              </span>
            </h1>

            <h1 className="font-bold my-1">
              Description :{" "}
              <span className=" pl-4 font-normal text-gray-800 ">
                {singleJob?.description}
              </span>
            </h1>

            <h1 className="font-bold my-1">
              Experience :{" "}
              <span className=" pl-4 font-normal text-gray-800 ">
                {singleJob?.experienceLevel} Years
              </span>
            </h1>

            <h1 className="font-bold my-1">
              Salary :{" "}
              <span className=" pl-4 font-normal text-gray-800 ">
                {singleJob?.salary} LPA
              </span>
            </h1>

            <h1 className="font-bold my-1">
              Total Applicants :{" "}
              <span className=" pl-4 font-normal text-gray-800 ">
                {singleJob?.applications?.length}
              </span>
            </h1>

            <h1 className="font-bold my-1">
              Posted Date :{" "}
              <span className=" pl-4 font-normal text-gray-800 ">
                {singleJob?.createdAt.split("T")[0]}
              </span>
            </h1>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

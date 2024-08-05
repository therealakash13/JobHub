import React from "react";
import Navbar from "../shared/Navbar";
import useGetAllAplicants from "@/hooks/useGetAllApplicants";
import { useParams } from "react-router-dom";
import ApplicantsTable from "./ApplicantsTable";
import { useSelector } from "react-redux";

export default function Applicants() {
  const { id } = useParams();
  const { applications } = useSelector((store) => store.application);

  useGetAllAplicants(id);
  return (
    <React.Fragment>
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <div className="text-xl font-bold my-5 grid grid-cols-2 items-center">
          <h1>Applicants ({applications?.length})</h1>
          <h1>Job Title : {applications[0]?.job?.title} </h1>
        </div>
        <ApplicantsTable />
      </div>
    </React.Fragment>
  );
}

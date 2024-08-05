import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchByText } from "@/redux/companyslice";
import JobsTable from "./JobsTable";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function AdminJobs() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchByText(input));
  }, [input]);
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-bold">Jobs</h1>
            <Input
              className="w-fit"
              placeholder="Filter By Job Title"
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <Button onClick={() => navigate("/admin/job/create")}>New Job</Button>
        </div>

        <JobsTable />
      </div>
    </>
  );
}

import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarImage } from "../ui/avatar";
import { setSingleJob } from "@/redux/jobslice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import useSetSingleJob from "@/hooks/useSetSingleJob";
import { useNavigate, useParams } from "react-router-dom";
import { JOB_API_ENDPOINT } from "../utils/constant";
import axios from "axios";
import { toast } from "sonner";
import store from "@/redux/store";

export default function AdminJobEdit() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useSetSingleJob(id);
  const navigate = useNavigate();
  const { singleJob } = useSelector((store) => store.job);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    experienceLevel: "",
    location: "",
    jobType: "",
    positions: "",
  });

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.put(
        `${JOB_API_ENDPOINT}/update/${id}`,
        {
          title: input.title,
          description: input.description,
          requirements: input.requirements,
          salary: input.salary,
          experienceLevel: input.experienceLevel,
          location: input.location,
          jobType: input.jobType,
          positions: input.positions,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        dispatch(setSingleJob(response.data.job));
        toast.success(response.data.message);
        store.dispatch(setSingleJob(response.data.job));
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      title: singleJob?.title || "",
      description: singleJob?.description || "",
      requirements: singleJob?.requirements || "",
      salary: singleJob?.salary || 0,
      experienceLevel: singleJob?.experienceLevel || 0,
      location: singleJob?.location || "",
      jobType: singleJob?.jobType || "",
      positions: singleJob?.positions || 0,
    });
  }, [setSingleJob]);

  return (
    <Fragment>
      <Navbar />
      <div className="flex items-center justify-center mx-auto max-w-7xl">
        <form
          onSubmit={handleSubmit}
          className="w-1/2 border-gray-400 shadow-md rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-2xl ">Edit Your Company</h1>
          <p className="text-gray-700 font-normal mb-5">
            Click <span className="font-bold">"Save Changes "</span>when you are
            done.
          </p>
          <div className="space-y-5">
            <div className="space-x-2">
              <Label>Job Title</Label>
              <Input
                type="text"
                name="title"
                value={input?.title}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                type="text"
                name="description"
                value={input?.description}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input?.requirements}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label>Salary</Label>
              <Input
                type="number"
                name="salary"
                value={input?.salary}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label>Experience</Label>
              <Input
                type="number"
                name="experience"
                value={input?.experienceLevel}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input?.location}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input?.jobType}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label>Position</Label>
              <Input
                type="number"
                name="positions"
                value={input?.positions}
                onChange={handleInputChange}
              />
            </div>

            {loading ? (
              <Button className="w-full mt-4">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait ...
              </Button>
            ) : (
              <Button className="w-full mt-4" type="submit">
                Save Changes
              </Button>
            )}
          </div>
        </form>
      </div>
    </Fragment>
  );
}

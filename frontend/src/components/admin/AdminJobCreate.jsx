import React, { Fragment, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { JOB_API_ENDPOINT } from "../utils/constant";
import { setAdminCreatedJob } from "@/redux/jobslice";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useNavigate } from "react-router-dom";

export default function AdminJobCreate() {
  const { allCompanies } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const [btnName, setBtnName] = useState("Select Your Company");
  const [btnLogo, setBtnLogo] = useState("");
  const [compId, setCompId] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    title: "",
    description: "",
    positions: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
  });

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(input);

    try {
      setLoading(true);
      const response = await axios.post(
        `${JOB_API_ENDPOINT}/post`,
        {
          title: input.title,
          description: input.description,
          requirements: input.requirements,
          salary: input.salary,
          location: input.location,
          jobType: input.jobType,
          experience: input.experience,
          companyId: compId,
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
        // console.log(response);
        dispatch(setAdminCreatedJob(response.data.job));
        navigate("/admin/jobs");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-1/2 border-gray-400 shadow-md rounded-md p-4 my-10"
        >
          <div className="flex flex-row items-center justify-between">
            <div>
              <h1 className="font-bold text-2xl ">Create Your Job</h1>
              <p className="text-gray-700 font-normal mb-5">
                You can Edit it Later
              </p>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="flex flex-row items-center justify-center"
                    variant="ghost"
                  >
                    {<img className="w-6 mr-2" src={btnLogo} alt="" />}
                    {btnName}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {allCompanies.map((company) => (
                    <Fragment key={company._id}>
                      <DropdownMenuCheckboxItem
                        onCheckedChange={() => {
                          setCompId(company._id);
                          setBtnName(company.name);
                          setBtnLogo(company.logo);
                        }}
                      >
                        <div className="flex flex-row items-center space-x-4">
                          <Avatar>
                            <AvatarImage
                              src={company.logo}
                              className="w-10"
                            ></AvatarImage>
                          </Avatar>
                          <span>{company.name}</span>
                        </div>
                      </DropdownMenuCheckboxItem>
                    </Fragment>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="space-y-5">
            <div>
              <Label>Job Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={handleInputChange}
                placeholder="Job Title Goes Here"
              />
            </div>

            <div>
              <Label>Job Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={handleInputChange}
                placeholder="Job Description Goes Here"
              />
            </div>

            <div>
              <Label>Job Positions</Label>
              <Input
                type="number"
                name="positions"
                value={input.positions}
                onChange={handleInputChange}
                placeholder="Job Position Goes Here"
              />
            </div>

            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={handleInputChange}
                placeholder="Job Requirements Goes Here Separated By Comma(,)"
              />
            </div>

            <div>
              <Label>Salary</Label>
              <Input
                type="number"
                name="salary"
                value={input.salary}
                onChange={handleInputChange}
                placeholder="Job Salary Goes Here in LPA"
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={handleInputChange}
                placeholder="Job Location Goes Here"
              />
            </div>

            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={handleInputChange}
                placeholder="Full-Time, Part-Time, Training"
              />
            </div>

            <div>
              <Label>Experience</Label>
              <Input
                type="number"
                name="experience"
                value={input.experience}
                onChange={handleInputChange}
                placeholder="Numbers of Years of Experiece"
              />
            </div>
          </div>

          {loading ? (
            <Button className="w-full mt-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait ...
            </Button>
          ) : (
            <Button className="w-full mt-4" type="submit">
              Create
            </Button>
          )}
        </form>
      </div>
    </>
  );
}

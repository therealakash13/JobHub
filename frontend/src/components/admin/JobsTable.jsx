import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Delete,
  Edit2,
  Eye,
  LocateFixedIcon,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { toast } from "sonner";
import axios from "axios";
import { JOB_API_ENDPOINT } from "../utils/constant";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogDescription,
} from "../ui/alert-dialog";

export default function JobsTable() {
  useGetAllAdminJobs();
  const { searchByText } = useSelector((store) => store.company);
  const { adminJobs } = useSelector((store) => store.job);
  const [filteredJobs, setFilteredJobs] = useState(adminJobs);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      const response = await axios.put(
        `${JOB_API_ENDPOINT}/delete/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        useGetAllAdminJobs();
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };
  // fix page not refreshing after job deletion
  useEffect(() => {
    const filteredJobs =
      adminJobs.length >= 0 &&
      adminJobs.filter((job) => {
        if (!searchByText) {
          return true;
        }
        return job?.title?.toLowerCase().includes(searchByText.toLowerCase());
      });
    setFilteredJobs(filteredJobs);
  }, [adminJobs, searchByText]);

  return (
    <Fragment>
      <Table>
        <TableCaption>List of All your Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Salary Offered</TableHead>
            <TableHead>Posted On</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredJobs?.map((job, index) => (
            <Fragment key={index}>
              <TableRow>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={job?.company?.logo} />
                    </Avatar>{" "}
                    <span>{job?.company?.name}</span>
                  </div>
                </TableCell>
                <TableCell className="cursor-pointer">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="ghost">{job?.title}</Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-96">
                      <div className="flex justify-between px-4 space-x-4">
                        <div className="space-y-1">
                          <h4 className="text-xl font-semibold">
                            {job?.title}
                          </h4>
                          <p className="text-base font-medium">
                            {job?.description}
                          </p>
                          <div className="flex flex-row items-center">
                            <span className="font-medium">Requirements : </span>
                            <div>
                              {job?.requirements?.map((requirement, index) => (
                                <button
                                  key={index}
                                  className="font-medium rounded-sm mx-1 overflow-x-hidden"
                                  variant="ghost"
                                >
                                  {requirement}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="font-medium">
                              Positions : {job?.positions}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">
                              Job Type : {job?.jobType}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">
                              Experience : {job?.experienceLevel} yrs
                            </span>
                          </div>
                          <div className="flex items-center pt-2">
                            <LocateFixedIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                            <span className="text-xs text-muted-foreground">
                              {job?.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </TableCell>
                <TableCell>
                  <span className="font-bold">{job?.salary} LPA</span>
                </TableCell>
                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                <TableCell>{job?.location}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-40 space-y-2">
                      <Button
                        variant="ghost"
                        onClick={() => {
                          navigate(`/admin/job/${job._id}/edit`);
                        }}
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() =>
                          navigate(`/admin/job/${job._id}/applicants`)
                        }
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            className="flex items-center gap-2 w-fit cursor-pointer"
                          >
                            <Delete className="w-4" />
                            <span>Delete</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are your sure you want to Delete this Job ?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cant be reversed. All the applicant of
                              this job render useless. Are you sure you want to{" "}
                              <span className="font-bold text-red-600">
                                Delete
                              </span>{" "}
                              this Job ?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(job._id)}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
}

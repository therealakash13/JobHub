import React, { Fragment } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, MoreHorizontal, X } from "lucide-react";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage } from "../ui/avatar";
import axios from "axios";
import { APPLICATION_ENDPOINT } from "../utils/constant";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

export default function ApplicantsTable() {
  const { aid } = useParams();

  const navigate = useNavigate();
  const { applications } = useSelector((store) => store.application);
  const demoUrl =
    "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?size=626&ext=jpg";

  const setApplicationStatus = async (status, id) => {
    try {
      const response = await axios.post(
        `${APPLICATION_ENDPOINT}/status/${id}/update`,
        { status: status.toString() },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        navigate(`/admin/jobs`);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <React.Fragment>
      <Table>
        <TableCaption>A List of all the Users applied</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <tr>
            {applications.length === 0 ? (
              <TableCell>
                <span className="font-semibold">No Applicants to show</span>
              </TableCell>
            ) : (
              applications.map((app, index) => (
                <Fragment key={index}>
                  <TableCell>
                    <div className="flex items-center mx-2">
                      <Avatar>
                        <AvatarImage
                          src={
                            app?.applicant?.profile?.profilePicture
                              ? app?.applicant?.profile?.profilePicture
                              : demoUrl
                          }
                        />
                      </Avatar>
                      {app.applicant?.fullName}
                    </div>
                  </TableCell>
                  <TableCell>{app?.applicant?.email}</TableCell>
                  <TableCell>{app?.applicant?.phoneNumber}</TableCell>
                  <TableCell>{app?.status}</TableCell>
                  <TableCell>
                    <a
                      href={app?.applicant?.profile?.resume}
                      className="hover:underline"
                    >
                      Resume
                    </a>
                  </TableCell>
                  <TableCell>{app?.createdAt.split("T")[0]}</TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-28">
                        <div className="flex-row items-center my-2">
                          <button
                            onClick={() =>
                              setApplicationStatus("Accepted", app._id)
                            }
                            className="flex items-center justify-center my-3"
                          >
                            <Check className="mx-1 w-4" />
                            <span>Accept</span>
                          </button>
                          <button
                            onClick={() =>
                              setApplicationStatus("Rejected", app._id)
                            }
                            className="flex items-center justify-center my-3"
                          >
                            <X className="mx-1 w-4" />
                            <span>Reject</span>
                          </button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </Fragment>
              ))
            )}
          </tr>
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

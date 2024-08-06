import React, { Fragment } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage } from "./ui/avatar";

export default function AppliedJobTable() {
  const { allAppliedJobs } = useSelector((store) => store.job);
  return (
    <Fragment>
      <Table>
        <TableCaption>A List of your Applied Job</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Logo</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <TableHead className="text-center font-bold">
              You haven't Applied for any Job yet !
            </TableHead>
          ) : (
            allAppliedJobs.map((appliedJob, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{appliedJob?.createdAt.split("T")[0]}</TableCell>
                  <TableCell>{appliedJob?.job?.title}</TableCell>
                  <TableCell>
                    <Avatar>
                      <AvatarImage
                        className="w-fit"
                        src={appliedJob?.job?.company?.logo}
                      />
                    </Avatar>
                  </TableCell>
                  <TableCell>{appliedJob?.job?.company?.name}</TableCell>

                  <TableCell className="text-right">
                    <Badge
                      className={`text-lg ${
                        appliedJob?.status === "Rejected"
                          ? "bg-red-400"
                          : appliedJob?.status === "Pending"
                          ? "bg-gray-400"
                          : "bg-green-400"
                      }`}
                    >
                      {appliedJob?.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </Fragment>
  );
}

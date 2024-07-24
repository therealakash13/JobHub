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

export default function AppliedJobTable() {
  return (
    <Fragment>
      <Table>
        <TableCaption>A List of your Applied Job</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3, 4, 5, 6].map((items, index) => {
            return (
              <TableRow key={index}>
                <TableCell>24-7-2024</TableCell>
                <TableCell>Front End Developer</TableCell>
                <TableCell>Google</TableCell>
                <TableCell className="text-right">
                  <Badge>Accepted</Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Fragment>
  );
}

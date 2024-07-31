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
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Delete, Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import useGetAllCompany from "@/hooks/useGetAllCompanies";
import { Button } from "../ui/button";
import axios from "axios";
import { COMPANY_ENDPOINT } from "../utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function CompaniesTable() {
  useGetAllCompany();
  const { allCompanies } = useSelector((store) => store.company);
  const navigate = useNavigate();

  // const handleDelete = async (id) => {
  //   try {
  //     const response = await axios.put(`${COMPANY_ENDPOINT}/delete/${id}`, {
  //       withCredentials: true,
  //     });
  //     if (response.data.success) {
  //       toast.success(response.data.message);
  //       useGetAllCompany();
  //       navigate("/admin/companies");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error(error.response.data.message);
  //   }
  // };

  return (
    <>
      <Table>
        <TableCaption>A List of Recently Registered Comapnies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allCompanies?.map((company, index) => (
            <Fragment key={company._id}>
              <TableRow key={index}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company?.logo} />
                  </Avatar>
                </TableCell>
                <TableCell>{company?.name}</TableCell>
                <TableCell>{company?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 space-y-2">
                      <Button
                        variant="ghost"
                        onClick={() =>
                          navigate(`/admin/company/${company._id}`)
                        }
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        // onClick={()=>handleDelete(company._id)}
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Delete className="w-4" />
                        <span>Delete</span>
                      </Button>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

import React, { Fragment, useEffect, useState } from "react";
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
import { Delete, Edit2, LocateFixedIcon, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import useGetAllCompany from "@/hooks/useGetAllCompanies";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

export default function CompaniesTable() {
  useGetAllCompany();
  const { allCompanies, searchByText } = useSelector((store) => store.company);
  const [filteredCompnay, setFilteredCompany] = useState(allCompanies);
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

  useEffect(() => {
    const filteredCompany =
      allCompanies.length >= 0 &&
      allCompanies.filter((company) => {
        if (!searchByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchByText.toLowerCase());
      });
    setFilteredCompany(filteredCompany);
  }, [allCompanies, searchByText]);

  return (
    <>
      <Table>
        <TableCaption>
          Hover on "Name" to see more information. Click on "Name" to visit
          website
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCompnay?.map((company, index) => (
            <Fragment key={company._id}>
              <TableRow key={index}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company?.logo} />
                  </Avatar>
                </TableCell>
                <TableCell className="cursor-pointer">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <a href={company?.website}>{company?.name}</a>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-96">
                      <div className="flex justify-between space-x-4">
                        <Avatar>
                          <AvatarImage src={company?.logo} />
                        </Avatar>
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">
                            {company?.name}
                          </h4>
                          <p className="text-sm">{company?.description}</p>
                          <div className="flex items-center pt-2">
                            <LocateFixedIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                            <span className="text-xs text-muted-foreground">
                              {company?.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </TableCell>
                <TableCell>{company?.updatedAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 space-y-2">
                      <Button
                        variant="ghost"
                        onClick={() =>
                          navigate(`/admin/company/${company._id}/edit`)
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

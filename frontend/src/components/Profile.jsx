import React, { Fragment, useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Edit, Mail } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import getAppliedJobs from "@/hooks/useGetAppliedJobs";

const isResume = true;

export default function Profile() {
  getAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const skills = user?.profile?.skills;
  const demoUrl =
    "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?size=626&ext=jpg";

  return (
    <Fragment>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={
                  user?.profile?.profilePicture
                    ? `${user?.profile?.profilePicture}`
                    : `${demoUrl}`
                }
                alt="Profile Image"
              />
            </Avatar>

            <div>
              <h1 className="font-medium text-xl">{user?.fullName}</h1>
              <p>{user.profile.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => {
              setOpen(true);
            }}
            className={"w-24 rounded-xl"}
            variant="outline"
          >
            <Edit />
          </Button>
        </div>

        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user.phoneNumber}</span>
          </div>
        </div>

        <div className=" my-10 ">
          <h1 className="font-bold text-xl">Skills</h1>
          <div className="flex items-center overflow-x-auto my-4">
            {skills.length != 0 ? (
              skills.map((skills, index) => {
                return (
                  <div key={index} className="mx-2 ">
                    <Badge key={index} className={"text-base"}>
                      {skills}
                    </Badge>
                  </div>
                );
              })
            ) : (
              <span className="font-medium mx-2">Not Applicable</span>
            )}
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5 ">
          <Label className="font-bold text-xl">Resume</Label>
          {isResume ? (
            <a
              target="blank"
              href={user?.profile?.resume}
              className="text-blue-500 w-full hover:underline cursor-pointer  mx-2"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="font-medium mx-2">Not Applicable</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-xl">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      {/* //Update Profile Dialog// */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </Fragment>
  );
}

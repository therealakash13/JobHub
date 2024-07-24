import React, { Fragment } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Edit, Mail } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";

const skills = ["Javascript", "CSS", "React", "Angular", "Tailwind"];
const isResume = true;

export default function Profile() {
  return (
    <Fragment>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?size=626&ext=jpg"
                alt="Profile Image"
              />
            </Avatar>

            <div>
              <h1 className="font-medium text-xl">Full Name</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta,
                deserunt.
              </p>
            </div>
          </div>
          <Button className={"w-24 rounded-xl"} variant="outline">
            <Edit />
          </Button>
        </div>

        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>akash.kr1022@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>1234567890</span>
          </div>
        </div>

        <div className=" my-10 ">
          <h1 className="font-bold text-xl">Skills</h1>
          <div className="flex items-center overflow-x-auto my-4">
            {skills.length != 0 ? (
              skills.map((skills, index) => {
                return (
                  <div className="mx-2 ">
                    <Badge key={index}>{skills}</Badge>
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
              href="https://youtube.com"
              className="text-blue-500 w-full hover:underline cursor-pointer  mx-2"
            >
              Resume.pdf
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
    </Fragment>
  );
}

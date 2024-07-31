import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_ENDPOINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";

import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import store from "@/redux/store";
import { setSingleCompany } from "@/redux/companyslice";

export default function CompanyCreate() {
  const { user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    companyName: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("companyName", input.companyName);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    formData.append("id", user?._id);
    if (input.file) {
      formData.append("file", input.file);
    }

    console.log(formData);

    try {
      setLoading(true);
      const response = await axios.post(
        `${COMPANY_ENDPOINT}/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        dispatch(setSingleCompany(response.data.companies));
        navigate("/admin/companies");
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
      <div className="flex items-center justify-center mx-auto max-w-7xl">
        <form
          onSubmit={handleSubmit}
          className="w-1/2 border-gray-400 shadow-md rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-2xl ">Create Your Company</h1>
          <p className="text-gray-700 font-normal mb-5">
            You can Edit it Later
          </p>
          <div className="space-y-5">
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="companyName"
                value={input.companyName}
                onChange={handleInputChange}
                placeholder="Your Company Name Goes Here"
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={handleInputChange}
                placeholder="Your Companies Description Goes Here"
              />
            </div>

            <div>
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={handleInputChange}
                placeholder="Your Companies Website Goes Here"
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={handleInputChange}
                placeholder="Your Companies Location Goes Here"
              />
            </div>

            <div className="flex items-center gap-2">
              <Label>Logo</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={handleFileUpload}
                className="cursor-pointer"
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

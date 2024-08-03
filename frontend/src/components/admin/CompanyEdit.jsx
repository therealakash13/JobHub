import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../shared/Navbar";
import useGetSingleCompany from "@/hooks/useGetSingleCompany";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { COMPANY_ENDPOINT } from "../utils/constant";
import { setSingleCompany } from "@/redux/companyslice";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import store from "@/redux/store";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogTitle,
} from "../ui/alert-dialog";

export default function CompanyEdit() {
  const param = useParams();
  useGetSingleCompany(param.id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { singleCompany } = useSelector((store) => store.company);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const response = await axios.put(
        `${COMPANY_ENDPOINT}/update/${param.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        dispatch(setSingleCompany(response.data.company));
        toast.success(response.data.message);
        store.dispatch(setSingleCompany(response.data.company));
        navigate("/admin/companies");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
    });
  }, [setSingleCompany]);

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mx-auto max-w-7xl">
        <form
          onSubmit={handleSubmit}
          className="w-1/2 border-gray-400 shadow-md rounded-md p-4 my-10"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold text-2xl ">Edit Your Company</h1>
              <p className="text-gray-700 font-normal mb-5">
                Click <span className="font-bold">"Save Changes "</span>when you
                are done.
              </p>
            </div>
            <div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Cancel</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to discard changes and go back ?
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => navigate("/admin/companies")}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          <p className="font-bold mb-5">
            Note : Refresh Page one and then make changes...
          </p>
          <div className="space-y-5">
            <div className="space-x-2">
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input?.name}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                type="text"
                name="description"
                value={input?.description}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                value={input?.website}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input?.location}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="flex justify-between items-center gap-2">
                <Label>Logo</Label>
                <Avatar>
                  <AvatarImage src={singleCompany?.logo} />
                </Avatar>
              </div>
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
              Save Changes
            </Button>
          )}
        </form>
      </div>
    </>
  );
}
// Fix Company Edit Page showing previous Company edit data

import { JOB_API_ENDPOINT } from "@/components/utils/constant";
import { setAdminJobs } from "@/redux/jobslice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useGetAllAdminJobs() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetAdminJobs = async () => {
      try {
        const response = await axios.get(`${JOB_API_ENDPOINT}/getadminjobs`, {
          withCredentials: true,
        });
        if (response.data.success) {
          dispatch(setAdminJobs(response.data.jobs));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetAdminJobs();
  }, []);
}

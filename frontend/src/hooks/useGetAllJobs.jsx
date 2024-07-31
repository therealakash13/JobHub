import { JOB_API_ENDPOINT } from "@/components/utils/constant";
import { setAllJobs } from "@/redux/jobslice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function useGetAllJobs() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetAllJobs = async () => {
      try {
        const response = await axios.get(`${JOB_API_ENDPOINT}/get`, {
          withCredentials: true,
        });
        if (response.data.success) {
          dispatch(setAllJobs(response.data.jobs));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetAllJobs();
  }, []);
}

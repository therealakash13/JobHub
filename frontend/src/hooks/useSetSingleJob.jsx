import { JOB_API_ENDPOINT } from "@/components/utils/constant";
import { setSingleJob } from "@/redux/jobslice";

import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function useSetSingleJob(id) {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`${JOB_API_ENDPOINT}/get/${id}`, {
          withCredentials: true,
        });
        if (response.data.success) {
          // console.log(response.data);
          dispatch(setSingleJob(response.data.job));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchJob();
  }, [id, dispatch]);
}

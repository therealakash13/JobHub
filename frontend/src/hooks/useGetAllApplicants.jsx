import {
  APPLICATION_ENDPOINT,
  JOB_API_ENDPOINT,
} from "@/components/utils/constant";
import { setApplications } from "@/redux/applicationslice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function useGetAllAplicants(id) {
  const dispatch = useDispatch();
  //   console.log(id);
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `${APPLICATION_ENDPOINT}/${id}/applicants`,
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          // console.log(response.data.job.applications);
          dispatch(setApplications(response.data.job.applications));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchJob();
  }, [id, dispatch]);
}

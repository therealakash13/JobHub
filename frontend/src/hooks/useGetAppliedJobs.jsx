import { APPLICATION_ENDPOINT } from "@/components/utils/constant";
import { setAllAppliedJobs } from "@/redux/jobslice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const getAppliedJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchApplidJobs = async () => {
      try {
        const respose = await axios.get(`${APPLICATION_ENDPOINT}/get`, {
          withCredentials: true,
        });
        if (respose.data.success) {
          // console.log(respose.data);
          dispatch(setAllAppliedJobs(respose.data.applications));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApplidJobs();
  }, []);
};
export default getAppliedJobs;

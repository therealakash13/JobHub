import { COMPANY_ENDPOINT } from "@/components/utils/constant";
import { setSingleCompany } from "@/redux/companyslice";

import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function useGetSingleCompany(id) {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(`${COMPANY_ENDPOINT}/get/${id}`, {
          withCredentials: true,
        });
        if (response.data.success) {
          console.log(response.data);
          dispatch(setSingleCompany(response.data.company));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCompany();
  }, [id, dispatch]);
}

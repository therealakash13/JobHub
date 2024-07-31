import { COMPANY_ENDPOINT } from "@/components/utils/constant";
import { setAllCompanies } from "@/redux/companyslice";

import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function useGetAllCompany() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(`${COMPANY_ENDPOINT}/get`, {
          withCredentials: true,
        });
        if (response.data.success) {
          console.log(response.data);
          dispatch(setAllCompanies(response.data.companies));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCompany();
  }, []);
}

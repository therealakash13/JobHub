import React from "react";
import { useParams } from "react-router-dom";

export default function CompanyEdit() {
  const param = useParams();
  console.log(param.id);
  return <div>CompanyEdit</div>;
}
// Make Company Edit Page

import React, { Fragment } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const filterData = [
  {
    filterType: "Location",
    value: ["Delhi NCR", "Bangalore", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    value: ["Full Stack", "Back End Developer", "Front End Developer"],
  },
  { filterType: "Salary", value: ["20k-40k", "40k-1LPA", "1LPA-5LPA"] },
  // {filterType: "Experience", value: ["1-3", "3-5", "5+"]}
];
export default function FilterCard() {
  return (
    <Fragment className="w-full bg-white p-3 rounded-md">
      <div className="text-2xl font-bold">Filter Jobs</div>
      <hr className="my-4" />
      <RadioGroup>
        {filterData.map((filter, index) => (
          <div key={index}>
            <h2 className="text-lg font-bold">{filter.filterType}</h2>
            <div>
              {filter.value.map((value, index) => {
                return (
                  <div className="flex items-center space-x-2 my-2">
                    <RadioGroupItem value={filter} />
                    <label className="text-sm">{value}</label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </Fragment>
  );
}

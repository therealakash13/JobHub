import React, { Fragment, useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "@/redux/jobslice";
import { Button } from "./ui/button";

const filterData = [
  {
    filterType: "Location",
    value: ["Delhi", "Bangalore", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    value: ["Full Stack", "Backend Developer", "Frontend Developer"],
  },
  {
    filterType: "Salary",
    value: ["Under 10 LPA", "20 LPA", "30 LPA", "40+ LPA"],
  },
  // {filterType: "Experience", value: ["1-3", "3-5", "5+"]}
];
export default function FilterCard() {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("");

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchTerm(selectedValue));
  }, [selectedValue]);

  return (
    <>
      <div className="w-full bg-white p-3 rounded-md my-4">
        <div className="text-2xl font-bold">Filter Jobs</div>
        <hr className="my-4" />
        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
          {filterData.map((filter, index1) => (
            <div key={index1}>
              <h2 className="text-lg font-bold">{filter.filterType}</h2>
              <div>
                {filter.value.map((value, index2) => {
                  const itemId = `id${index1}-${index2}`;
                  return (
                    <div
                      key={itemId}
                      className="flex items-center space-x-2 my-2"
                    >
                      <RadioGroupItem value={value} id={itemId} />
                      <label htmlFor={itemId} className="text-sm">
                        {value}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>
      <Button className={"w-full"} onClick={() => dispatch(setSearchTerm(""))}>
        Clear Filter{" "}
      </Button>
    </>
  );
}

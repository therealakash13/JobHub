import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchTerm } from "@/redux/jobslice";

export default function CategoryCarousel() {
  const category = [
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "Fullstack Developer",
    "Graphics Designer",
    "Data Scientist",
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchHandler = (query) => {
    dispatch(setSearchTerm(query));
    navigate("/browse");
  };

  return (
    <>
      <div>
        <Carousel className="w-full max-w-xl mx-auto my-16">
          <CarouselContent>
            {category.map((item, index) => (
              <CarouselItem
                key={index}
                className="sm:basis-1/2 md:basis-1/2 lg:basis-1/3"
              >
                <Button
                  onClick={() => searchHandler(item)}
                  variant="outline"
                  className="rounded-full"
                >
                  {item}
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
}

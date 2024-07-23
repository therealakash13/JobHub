import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";

export default function CategoryCarousel() {
  const category = [
    "FrontEnd Developer",
    "BackEnd Developer",
    "Data Scientist",
    "Graphics Designer",
    "Full Stack Developer",
  ];
  return (
    <>
      <div>
        <Carousel className="w-full max-w-xl mx-auto my-16">
          <CarouselContent>
            {category.map((item, index) => (
              <CarouselItem className="sm:basis-1/2 md:basis-1/2 lg:basis-1/3">
                <Button variant="outline" className="rounded-full">
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

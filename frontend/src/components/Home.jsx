import React, { Fragment } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJob from "./LatestJob";
import Footer from "./Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";

export default function Home() {
  useGetAllJobs();
  return (
    <Fragment>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJob />
      <Footer />
    </Fragment>
  );
}

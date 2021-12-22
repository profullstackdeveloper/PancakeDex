import React from "react";

import HeroSection from "../Components/HeroSection/HeroSection";
import MyCounter from "../Components/Counter/Counter";
import Trending from "../Components/Trending/Trending";

const Home = ({ collapsed }) => {
  return (
    <>
      <HeroSection collapsed={collapsed} />
      <MyCounter collapsed={collapsed} />
      <Trending collapsed={collapsed} />
    </>
  );
};
export default Home;

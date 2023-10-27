import Category from "@/components/Category";
import ColumImage from "@/components/ColumImage";
import HomeContainer from "@/components/HomeContainer";
import SliderCard from "@/components/SliderCard";
import TopNewest3d from "@/components/TopNewest3d";
import TopSales3d from "@/components/TopSales3d";
import React from "react";

function Home() {
  return (
    <div>
      <SliderCard />
      <Category />
      <ColumImage />
      <HomeContainer />
      <TopSales3d />
      <TopNewest3d />
    </div>
  );
}

export default Home;
